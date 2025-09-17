import { User } from '../Models/UserSchema.js';
import { University } from '../Models/UniversitySchema.js';

// lists all users of owners uni 
export const listUsers = async (req, res) => {
    try {
        const universityId = req.user.university;
        const users = await User.find({ university: universityId });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// removes user from owners uni and deletes the DB record
export const removeUsers = async (req, res) => {
    try {
        const { userId } = req.body;
        const universityId = req.user.university;

        const userToRemove = await User.findOne({ _id: userId, university: universityId });

        if (!userToRemove) {
            return res.status(404).json({ message: "User not found in this university." });
        }
        if (userToRemove.role === 'owner') {
            return res.status(400).json({ message: "Cannot remove the owner." });
        }

        await University.updateOne({ _id: universityId }, { $pull: { users: userId } });
        await User.findByIdAndDelete(userId);

        res.json({ message: 'User removed successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// transfers ownership to another user in the same uni and demotes previous owner to admin :[
export const transferOwnership = async (req, res) => {
    try {
        const { newOwnerEmail } = req.body;
        const universityId = req.user.university;
        const university = await University.findById(universityId);

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        if (university.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Only the current owner can transfer ownership' });
        }

        const newOwner = await User.findOne({ email: newOwnerEmail, university: universityId });
        if (!newOwner) {
            return res.status(404).json({ message: 'New owner not found in this university' });
        }

        const currentOwner = await User.findById(req.user.id);
        newOwner.role = 'owner';
        await newOwner.save();
        currentOwner.role = 'admin';
        await currentOwner.save();
        university.owner = newOwner._id;
        await university.save();

        res.json({ message: 'Ownership transferred successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};