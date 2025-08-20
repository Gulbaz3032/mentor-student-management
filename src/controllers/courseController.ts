import { Request, Response } from "express";
import CourseService from "../services/courseService";

// ✅ Create a course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { mentorId, title, description } = req.body;
    const course = await CourseService.createCourse(mentorId, title, description);
    return res.status(201).json({ message: "Course created successfully", course });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};

// ✅ Get all courses
export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await CourseService.getAllCourses();
    return res.status(200).json({ courses });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
};

// ✅ Get courses by mentor
export const getCoursesByMentor = async (req: Request, res: Response) => {
  try {
    const courses = await CourseService.getCoursesByMentor(req.params.mentorId);
    return res.status(200).json({ courses });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch mentor courses", error: error.message });
  }
};

// ✅ Enroll a student in a course
export const enrollStudent = async (req: Request, res: Response) => {
  try {
    const { courseId, studentId } = req.body;
    const enrollment = await CourseService.enrollStudent(courseId, studentId);
    return res.status(201).json({ message: "Student enrolled successfully", enrollment });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to enroll student", error: error.message });
  }
};
