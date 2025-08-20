import mongoose, { Schema, Types } from "mongoose";

export interface ICourse extends Document{
    title: string;
    description: string;
    mentor: Types.ObjectId;
    createdAt: Date;
}

const courseSchema = new Schema<ICourse>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        mentor: {type: Schema.Types.ObjectId, ref: "User", required: true}
    },
    {
        timestamps: true
    }
);

const courseModel = mongoose.model<ICourse>("Course", courseSchema);
export default courseModel;
