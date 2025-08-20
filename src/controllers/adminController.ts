import { Request, Response } from "express";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        if(!users) {
            return res.status(404).json({
                message: "Users not found"
            });
        }

        return res.status(200).json({
            message: "successfully get data",
            users
        });

    } catch (error : any) {
        console.log("server error", error);
        return res.status(500).json({
            message: "server error, failed to get all users",
            error: error.message
        });
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await courseModel.find().populate("mentor");
        return res.status(200).json({
            message: "succesfully get the course",
            courses
        });

    } catch (error : any) {
        console.log("failed to get all courses, server error", error);
        return res.status(500).json({
            message: "Failed to get all courses, server error",
            error: error.message
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await userModel.findByIdAndDelete(userId);
        return res.status(200).json({
            message: "deleted successfully"
        });
    } catch (error : any) {
        return res.status(500).json({
            message: "failed to delete, server error",
            error: error.message
        });
    }
}