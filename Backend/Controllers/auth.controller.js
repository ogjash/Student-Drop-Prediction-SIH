import { User } from '../Models/UserSchema.js';
import { University } from '../Models/UniversitySchema.js';
import jwt from 'jsonwebtoken';
import { cookieConfig } from '../config/cookies.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register a university and its owner user
export const registerUniversity = async (req, res) => {
    const session = await University.startSession();
    session.startTransaction();
    try {
        const { username, domain, universityName, password, contactNumber } = req.body;
        if (!username || !domain || !universityName || !password || !contactNumber) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const role = 'owner';

        const isUniversity = await University.findOne({ domain }).session(session);
        if (isUniversity) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Domain already registered' });
        }

        const university = new University({ name: universityName, domain });
        await university.save({ session });

        const email = `${username}@${domain}`;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            university: university._id,
            email,
            passwordHash,
            contactNumber,
            role,
        });
        await user.save({ session });

        university.owner = user._id;
        university.users.push(user._id);
        await university.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'University and owner registered successfully.' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: err.message });
    }
};

// Register a normal user (role defaults to 'user')
export const registerUsers = async (req, res) => {
    try {
        const { username, domain, password, contactNumber } = req.body;
        if (!username || !domain || !password || !contactNumber) {
            return res.status(400).json({ message: 'Please provide username, domain, password, and contact number' });
        }
        const university = await University.findOne({ domain });
        if (!university) {
            return res.status(400).json({ message: 'Invalid university domain' });
        }
        const email = `${username}@${domain}`;
        const existing = await User.findOne({ $or: [{ email }, { username, university: university._id }] });
        if (existing) {
            if (existing.email === email) {
                return res.status(400).json({ message: 'An account with this email already exists' });
            } else {
                return res.status(400).json({ message: 'This username is already taken for the specified university' });
            }
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new User({ username, email, passwordHash, university: university._id, role: 'user', contactNumber });
        await user.save();
        university.users.push(user._id);
        await university.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login user (for both owners and normal users)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+passwordHash');
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role, university: user.university }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, cookieConfig);
        res.json({ user: { id: user._id, username: user.username, email: user.email, role: user.role, university: user.university } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Logout user
export const logout = (req, res) => {
    res.clearCookie('token', cookieConfig);
    res.json({ message: 'Logged out successfully' });
};

export const verify = async (req, res) => {
// Verify user session
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
