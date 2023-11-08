import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET() {
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks, { status: 200, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Fail to get tasks", status: 500, success: false});
    }
}

export async function POST(req) {
    const {title, content, userId, status} = await req.json();

    const token = req.cookies.get("token") ?.value || '' ;
    const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    
    try {
        const tasks = new Task({
            title, 
            content,
            userId: data.id,
            status
        })
        const createdTask = await tasks.save();
        return NextResponse.json(createdTask, {success: true, status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Fail to create task", success: false, status: 500})
    }
}