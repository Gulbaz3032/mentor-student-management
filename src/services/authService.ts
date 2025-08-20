import userModel from "../models/userModel"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

class AuthService {
    async register(data: { name: string; email: string; password: string; role?: "student" | "mentor" | "admin" }) {
        const existingUser = await userModel.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new userModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "student"
        });

        await user.save();

        const token = generateToken({ id: user._id, role: user.role });
        return { user, token };
    }

    async login(email: string, password: string) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken({ id: user._id, role: user.role });
        return { user, token };
    }
}

export default new AuthService();
