import mongoose, { Schema, Types } from "mongoose";

export interface IEntrollment extends Document {
    student: Types.ObjectId;
    course: Types.ObjectId;
    enrollmentAt: Date;
    status: "active" | "completed" | "dropped";
}

const enrollmentSchema = new Schema<IEntrollment> ({
    student: { type: Schema.Types.ObjectId, ref: "User", required: true},
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true},
    enrollmentAt: { type: Date, required: true},
    status: {
        type: String,
        enum: [ "active", "completed", "dropped"],
        default: "active"
    },
}, {
    timestamps: true
});

const enrollmentModel = mongoose.model<IEntrollment>("Enrollment", enrollmentSchema);
export default enrollmentModel;