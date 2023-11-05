import { User } from "@/models/user";
import { NextResponse } from "next/server";
const { connectDb } = require("@/helper/db");
import bcrypt from "bcryptjs"

connectDb();

export async function POST(req) {
    try {
        const {name, email, password, about, profileURL} = await req.json();

    //check if the user already exists
    const existUser = await User.findOne({email});
    if(existUser){
        return NextResponse.json({message: "User already exists", status:400, success: false});
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        about,
        profileURL,
    })
    const savedUser = await user.save();
    return NextResponse.json({savedUser, message: 'Sign up successfully', status: 201, success: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "sign up failed", status: 400, success: false});
    }
}