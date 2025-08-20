import { Request, Response } from "express";
import SessionService from "../services/sessionService";

// ✅ Book a session
export const bookSession = async (req: Request, res: Response) => {
  try {
    const { studentId, mentorId, courseId, scheduledAt } = req.body;
    const session = await SessionService.bookSession(studentId, mentorId, courseId, scheduledAt);
    return res.status(201).json({ message: "Session booked successfully", session });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to book session", error: error.message });
  }
};


// ✅ Approve a session
export const approveSession = async (req: Request, res: Response) => {
  try {
    const session = await SessionService.approvedSession(req.params.sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    return res.status(200).json({ message: "Session approved", session });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to approve session", error: error.message });
  }
};

// ✅ Reschedule a session
export const rescheduleSession = async (req: Request, res: Response) => {
  try {
    const { newDate } = req.body;
    const session = await SessionService.rescheduleSession(req.params.sessionId, newDate);
    if (!session) return res.status(404).json({ message: "Session not found" });

    return res.status(200).json({ message: "Session rescheduled", session });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to reschedule session", error: error.message });
  }
};

// ✅ Add feedback
export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { feedback, rating } = req.body;
    const session = await SessionService.addFeedback(req.params.sessionId, feedback, rating);
    if (!session) return res.status(404).json({ message: "Session not found" });

    return res.status(200).json({ message: "Feedback added", session });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to add feedback", error: error.message });
  }
};
