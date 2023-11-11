import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const {taskId} = params;
    try {
        const singleUser = await Task.findById(taskId);
        return NextResponse.json(singleUser, {status:200, success:true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "failed to get single user", status: 500, success: false});
    }
}

export async function PUT (req, {params}){
    const {taskId} = params;
    const {title, content, status} = await req.json();
    try {
        const tasks = await Task.findById(taskId);
        tasks.title = title;
        tasks.content = content;
        tasks.status = status;
        const updatedTask = await tasks.save();
        return NextResponse.json(updatedTask, {status: 200, success: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Fail to Update tasks", status: 404, success: false});
    }
}

export async function DELETE (req, {params}) {
    const {taskId} = params;
    const id = taskId;
    try {
        await Task.deleteOne({
            _id: id,
        })
        return NextResponse.json({message: "Task deleted",success: true, status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Failed to delete task", status: 404, success: false});
    }
}