import { Router } from "express";
import { createCourse, mySessions, updateSessionStatus } from "../controllers/mentorController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/courses", authMiddleware, roleMiddleware(["mentor"]), createCourse);
router.get("/sessions", authMiddleware, roleMiddleware(["mentor"]), mySessions);
router.put("/sessions/status", authMiddleware, roleMiddleware(["mentor"]), updateSessionStatus);

export default router;
