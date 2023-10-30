import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    addedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Started","Pending", "Completed", "Just Added"],
        default: "Just Added",
    },
    userId: {
        type: mongoose.ObjectId,
        required: true,
    }
});

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);