import { User } from "@/models/user";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const token = request.cookies.get("token") ?.value || '' ;
        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await User.findById(data.id).select("-password")
        return NextResponse.json(user)
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}