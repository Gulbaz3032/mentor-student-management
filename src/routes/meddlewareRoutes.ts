// src/routes/meddlewareRoutes.ts
import { Router, Response } from "express";
import { AuthRequest, authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";
import sessionModel from "../models/sessionModel";

const router = Router();

// ✅ Admin Dashboard
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req: AuthRequest, res: Response) => {
    try {
      // Fetch data
      const users = await userModel.find().select("name email role");
      const courses = await courseModel.find().populate("mentor", "name email");
      const sessions = await sessionModel.find()
        .populate("student", "name email")
        .populate("mentor", "name email")
        .populate("course", "title");

      // Group counts by role
      const roleCounts = {
        students: users.filter(u => u.role === "student").length,
        mentors: users.filter(u => u.role === "mentor").length,
        admins: users.filter(u => u.role === "admin").length,
      };

      res.json({
        message: `Welcome Admin ${req.user?.name}`,
        stats: {
          totalUsers: users.length,
          ...roleCounts,
          totalCourses: courses.length,
          totalSessions: sessions.length,
        },
        recentCourses: courses.slice(-5),   // last 5 courses
        recentSessions: sessions.slice(-5) // last 5 sessions
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to load admin dashboard",
        error: error.message,
      });
    }
  }
);

// ✅ Mentor Dashboard
router.get(
  "/mentor-dashboard",
  authMiddleware,
  roleMiddleware(["mentor"]),
  async (req: AuthRequest, res: Response) => {
    try {
      // Find mentor’s courses & sessions
      const courses = await courseModel.find({ mentor: req.user?._id });
      const sessions = await sessionModel.find({ mentor: req.user?._id })
        .populate("student", "name email")
        .populate("course", "title scheduledAt");

      res.json({
        message: `Welcome Mentor ${req.user?.name}`,
        totalCourses: courses.length,
        totalSessions: sessions.length,
        courses,
        upcomingSessions: sessions.filter(s => new Date(s.scheduledAt) > new Date())
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to load mentor dashboard",
        error: error.message,
      });
    }
  }
);

// ✅ Shared (Admin + Mentor)
router.get(
  "/shared",
  authMiddleware,
  roleMiddleware(["admin", "mentor"]),
  (req: AuthRequest, res: Response) => {
    res.json({ message: `Admins and Mentors can see this. Hello ${req.user?.name}` });
  }
);

export default router;
