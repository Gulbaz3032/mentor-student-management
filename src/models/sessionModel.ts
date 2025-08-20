import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISession extends Document {
    course: Types.ObjectId;
    mentor: Types.ObjectId;
    student: Types.ObjectId;
    scheduledAt: Date;
    status: "pending" | "approved" | "completed" | "cancelled";
    feedback?: string;
    rating?: number;
}

const sessionSchema = new Schema<ISession> (
    {
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true},
        mentor: { type: Schema.Types.ObjectId, ref: "User", required: true},
        student: { type: Schema.Types.ObjectId, ref: "User", required: true},
        scheduledAt: { type: Date, required: true},
        status: {
            type: String,
            enum: [ "pending", "approved", "completed", "cancelled"],
            default: "pending",
        },
        feedback: { type: String},
        rating: { type: Number}
    },
    {
        timestamps: true
    }
);

const sessionModel = mongoose.model<ISession>("Session", sessionSchema);
export default sessionModel;
