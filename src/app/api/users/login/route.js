import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
const { connectDb } = require("@/helper/db");
import jwt from "jsonwebtoken"

connectDb();

export async function POST(req){
    try {
        const {email, password} = await req.json();
        // check if user already exists
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({message: "Invalid Email or password", status: 400})
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({message: "Invalid password", status: 400});
        }
        // creating token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: "1h"});

        const response = NextResponse.json({message: "login successful", status: 201, success: true});
        
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Login failed", status: 400, success: false})
    }
}