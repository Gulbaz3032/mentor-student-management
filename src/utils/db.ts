import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database is connected successfully");
    } catch (error) {
        console.log("Failed to connect database", error);
    }
}