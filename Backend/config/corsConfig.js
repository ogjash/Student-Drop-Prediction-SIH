export const corsConfig = {
    origin: process.env.NODE_ENV === 'production'
        ? ["https://somevercel.com", "https://www.somevercel.com"]
        : ["http://localhost:5173"],
    credentials: true
}; 