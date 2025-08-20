import { Router } from "express";
import { getUserById, updateUser, getMentors, getStudents } from "../controllers/userController";

const router = Router();

// GET single user by ID
router.get("/:id", getUserById);

// UPDATE user
router.put("/:id", updateUser);

// GET all mentors
router.get("/role/mentors", getMentors);

// GET all students
router.get("/role/students", getStudents);



export default router;
