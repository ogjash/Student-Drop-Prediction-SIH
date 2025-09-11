import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { username, email, password, university } = req.body;
        
        if (!username || !email || !password || !university) {
            return res.status(400).json({ message: "Please provide username, email, password, and university" });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email" });
        }
        
        const existingUser = await User.findOne({ $or: [{ email }, { username, university }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "An account with this email already exists" });
            } else {
                return res.status(400).json({ message: "This username is already taken for the specified university" });
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            university,
            passwordHash: hashedPassword
        });
        
        await user.save();
        
        const userData = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res
            .status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({ message: "Signup successful", token, user: userData });
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sign up controller error" });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email" });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please check your email or sign up." });
        }
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const userData = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        };
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({ message: "Signin successful", token, user: userData });
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sign in controller error" });
    }
};