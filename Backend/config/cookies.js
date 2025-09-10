import dotenv from 'dotenv';
dotenv.config();

export const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

