import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        
        if (!MONGODB_URL) {
            throw new Error('MONGODB_URL is not defined in environment variables');
        }

        // Remove deprecated options and use only necessary ones
        await mongoose.connect(MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        });

        const db = mongoose.connection;

        db.on('connected', () => {
            console.log(`MongoDB connected successfully to ${db.host}`);
        });

        db.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        db.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Add graceful shutdown handling
        process.on('SIGINT', async () => {
            try {
                await db.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error during MongoDB disconnection:', err);
                process.exit(1);
            }
        });

        return db;

    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
}