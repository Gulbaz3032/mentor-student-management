import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "mentor" | "admin";
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUser>("User", userSchema);
export default userModel;