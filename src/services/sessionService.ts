import sessionModel from "../models/sessionModel";

class SessionService {
    async bookSession(studentId: string, mentorId: string, courseId: string, scheduledAt: Date) {
        const session = new sessionModel({ 
            student: studentId, 
            mentor: mentorId, 
            course: courseId, 
            scheduledAt 
        });
        return await session.save();
    }

    async approvedSession(sessionId: string) {
        return await sessionModel.findByIdAndUpdate(
            sessionId, 
            { status: "approved" }, 
            { new: true }
        );
    }

    async rescheduleSession(sessionId: string, newDate: Date) {
        return await sessionModel.findByIdAndUpdate(
            sessionId, 
            { scheduledAt: newDate, status: "pending" }, // use allowed status
            { new: true }
        );
    }

    async addFeedback(sessionId: string, feedback: string, rating: number) {
        return await sessionModel.findByIdAndUpdate(
            sessionId, 
            { feedback, rating }, 
            { new: true }
        );
    }
}

export default new SessionService();
