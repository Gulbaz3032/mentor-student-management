import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import courseModel from "../models/courseModel";
import sessionModel from "../models/sessionModel";

export const createCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description } = req.body;

        const course = await courseModel.create({
            title, 
            description,
            mentor: req.user?._id,
        });

        return res.status(201).json({
            message: "course created successfully",
            course
        });

    } catch (error: any) {
        console.log("Failed to create course", error);
        return res.status(500).json({
            message: "Failed to create course, server error",
            error: error.message
        });
    }
}

export const mySessions = async (req: AuthRequest, res: Response) => {
    try {
        const sessions = await sessionModel.find({ mentor: req.user?._id }).populate("student course");

        return res.status(200).json({
            sessions
        })
    } catch (error : any) {
        console.log("Failed to my sessionm server error", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

export const updateSessionStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { sessionId, status } = req.body;
        const session = await sessionModel.findByIdAndUpdate(
            {_id: sessionId, mentor: req.user?._id},
            {status},
            { new: true }
        );

        return res.status(200).json({
            message:"Session updated",
            session
        })
    } catch (error : any) {
        console.log("failed to update sessions status, server error", error);
        return res.status(500).json({
            message: "Failed to update sessions status, server error",
            error: error.message
        });
    }
}
