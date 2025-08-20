// src/routes/student.routes.ts
import { Router } from "express";
import { enrollCourse, myCourses, bookSession } from "../controllers/studentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

// Student routes (protected)

router.post("/enroll", authMiddleware, roleMiddleware(["student"]), enrollCourse);
router.get("/courses", authMiddleware, roleMiddleware(["student"]), myCourses);
router.post("/sessions", authMiddleware, roleMiddleware(["student"]), bookSession);


export default router;
