import courseModel from "../models/courseModel";
import enrollmentModel from "../models/enrollmentModel";

class CourseService {
    async createCourse ( mentorId: string, title: string, description: string) {
        const course = new courseModel({ mentor: mentorId, title, description });
        return await course.save();
    }

    async getAllCourses () {
        return await courseModel.find().populate("mentor", "name email");
    }

    async getCoursesByMentor(mentorId: string) {
        return await courseModel.find({ mentor: mentorId }).populate("mentor", "name email");
    }

    async enrollStudent (courseId: string, studentId: string) {
        const enrollment = new enrollmentModel({ course: courseId, student: studentId });
        return await enrollment.save();
    }
    }

    export default new CourseService();