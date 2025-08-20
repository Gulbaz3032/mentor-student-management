import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./utils/db";
import multer from "multer";

// Routes
import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import courseRoutes from "./routes/courseRoutes";

import meddlewareRoutes from "./routes/meddlewareRoutes"

dotenv.config();



const app = express();
app.use(express.json());

const PORT = process.env.PORT || "2222";
dbConnect();

const upload = multer();
app.use(upload.none());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/courses", courseRoutes);

// middleware routes 

app.use("/api/middleware", meddlewareRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
