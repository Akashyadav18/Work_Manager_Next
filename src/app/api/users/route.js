import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

connectDb();

export async function GET() {
    let users =[]
    try {
        users = await User.find().select("-password");
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Fail to get data", status:500})
    }
    return NextResponse.json(users);
}

export async function POST(request) {
    const { name, email, password, about, profileURL } = await request.json();

    const user = new User({ name, email, password, about, profileURL });

    try {
        user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT));
        console.log(user.password);
        const createdUser = await user.save();
        const response = NextResponse.json(createdUser, { status: 201 });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Fail to Create User", status: 500 });
    }
}