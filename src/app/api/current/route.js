import { User } from "@/models/user";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function getServerSideProps(request) {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({message: "User is not logged in"});
        }
        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await User.findById(data._id).select("-password");
        console.log("current user", user);
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return { props: {} };
    }
}

