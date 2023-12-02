import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const {userId} = params;
    try {
        const tasks = await Task.find({
            userId: userId
        })
        return NextResponse.json(tasks, {status:200, success:true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Failed to get user tasks", status: 500, success:false});
    }
}