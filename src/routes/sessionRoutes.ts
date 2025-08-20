import { Router } from "express";
import { bookSession, approveSession, rescheduleSession, addFeedback } from "../controllers/sessionController";

const router = Router();

// Book a new session
router.post("/book", bookSession);

// Approve session
router.patch("/:sessionId/approve", approveSession);

// Reschedule session
router.patch("/:sessionId/reschedule", rescheduleSession);

// Add feedback to session
router.patch("/:sessionId/feedback", addFeedback);

export default router;
