import jwt, { Secret, JwtPayload } from "jsonwebtoken";

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const JWT_SECRET: Secret = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // 7 days

// Generate JWT token
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
export const verifyToken = (token: string): string | JwtPayload => {
    return jwt.verify(token, JWT_SECRET);
};
