import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

export default connectDB;