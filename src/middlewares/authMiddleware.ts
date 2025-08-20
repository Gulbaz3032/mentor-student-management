    import { Request, Response, NextFunction } from "express";
    import jwt from "jsonwebtoken";
    import userModel, { IUser } from "../models/userModel";

    export interface AuthRequest extends Request {
        user?: IUser
    }

    export const authMiddleware = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token) {
                return res.status(401).json({
                    message: "No token provided"
                });
            }
            const decoded  = jwt.verify(token, process.env.JWT_SECRET as string) as {
                id: string;
            };

            const user = await userModel.findById(decoded.id);
            if(!user) {
                return res.status(400).json({
                    message: "Invaled token"
                });
            }

            req.user = user;
            next();

        } catch (error: any) {
            console.log("Unauthorized", error);
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    }