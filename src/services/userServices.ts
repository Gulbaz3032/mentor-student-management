import userModel from "../models/userModel";

class UserServices {
    async getUserById(id: string) {
        return await userModel.findById(id).select("-password");
    }
    async updateUser(id: string, data: Partial<{name: string; email: string}>) {
        return await userModel.findByIdAndUpdate(id, data, { new: true }).select("-password");
    }
    async getMentors() {
        return await userModel.find({ role: "mentor" }).select("-password");
    }
    async getStudents() {
        return await userModel.find({ role: "student" }).select("-password");
    }
}

export default new UserServices();