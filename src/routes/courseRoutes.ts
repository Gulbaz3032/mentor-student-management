import { Router } from "express";
import { createCourse, getAllCourses, getCoursesByMentor, enrollStudent } from "../controllers/courseController";

const router = Router();

// Create course
router.post("/create-course", createCourse);

// Get all courses
router.get("/get-course", getAllCourses);

// Get mentor’s courses
router.get("/mentor/:mentorId", getCoursesByMentor);

// Enroll student
router.post("/enroll", enrollStudent);

export default router;
