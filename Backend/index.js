import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { corsConfig } from './config/corsconfig.js';
import authRoutes from './routes/auth.routes.js';
import ownerRoutes from './routes/owner.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Drop prediction Api is working!',
        version: '1.0.0',
    });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/owner', ownerRoutes);

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
