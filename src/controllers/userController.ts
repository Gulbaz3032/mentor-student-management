import { Request, Response } from "express";
import UserServices from "../services/userServices";

// ✅ Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

// ✅ Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserServices.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// ✅ Get all mentors
export const getMentors = async (_req: Request, res: Response) => {
  try {
    const mentors = await UserServices.getMentors();
    return res.status(200).json({ mentors });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch mentors", error: error.message });
  }
};

// ✅ Get all students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await UserServices.getStudents();
    return res.status(200).json({ students });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};
