export const corsConfig = {
    origin: process.env.NODE_ENV === 'production'
        ? ["https://sih-impact-crew.vercel.app/"]
        : ["http://localhost:5173"],
    credentials: true
}; 