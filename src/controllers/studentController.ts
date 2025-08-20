// src/controllers/student.controller.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import enrollmentModel from "../models/enrollmentModel";
import sessionModel from "../models/sessionModel";

// ✅ Enroll in a course
export const enrollCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    // Check if already enrolled
    const existingEnrollment = await enrollmentModel.findOne({
      student: req.user?._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await enrollmentModel.create({
      student: req.user?._id,
      course: courseId,
      enrollmentAt: new Date(),
    });

    return res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error: any) {
    console.error("Failed to enroll course:", error);
    return res.status(500).json({
      message: "Server failed to enroll course",
      error: error.message,
    });
  }
};

// ✅ Get student's enrolled courses
export const myCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await enrollmentModel
      .find({ student: req.user?._id })
      .populate({
        path: "course",
        populate: { path: "mentor", select: "name email" }, // show mentor details
      });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found" });
    }

    return res.status(200).json({
      message: "Fetched enrolled courses successfully",
      courses,
    });
  } catch (error: any) {
    console.error("Failed to fetch enrolled courses:", error);
    return res.status(500).json({
      message: "Server error while fetching courses",
      error: error.message,
    });
  }
};

// ✅ Book a session
export const bookSession = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, mentorId, scheduledAt } = req.body;

    if (!courseId || !mentorId || !scheduledAt) {
      return res.status(400).json({ message: "courseId, mentorId, and scheduledAt are required" });
    }

    // Check if student is enrolled in the course
    const enrolled = await enrollmentModel.findOne({
      student: req.user?._id,
      course: courseId,
    });

    if (!enrolled) {
      return res.status(403).json({ message: "You must be enrolled in this course to book a session" });
    }

    // Check date validity
    if (new Date(scheduledAt) < new Date()) {
      return res.status(400).json({ message: "Scheduled date must be in the future" });
    }

    const session = await sessionModel.create({
      course: courseId,
      mentor: mentorId,
      student: req.user?._id,
      scheduledAt,
    });

    return res.status(201).json({
      message: "Session booked successfully",
      session,
    });
  } catch (error: any) {
    console.error("Failed to book session:", error);
    return res.status(500).json({
      message: "Failed to book session, server error",
      error: error.message,
    });
  }
};
