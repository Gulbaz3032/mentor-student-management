import { Request, Response } from "express";
import AuthService from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.register(req.body);
        return res.status(201).json({
            message: "User registered successfully",
            ...result
        });
    } catch (error: any) {
        console.error("Failed to register user:", error);
        return res.status(400).json({
            message: error.message || "Failed to register user"
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        return res.status(200).json({
            message: "Successfully logged in",
            ...result
        });
    } catch (error: any) {
        console.error("Failed to login:", error);
        return res.status(400).json({
            message: error.message || "Failed to login"
        });
    }
};
