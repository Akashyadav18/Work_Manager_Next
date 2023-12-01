import { User } from "@/models/user";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function getServerSideProps(context) {
    try {
        const token = context.req.cookies.token;
        if (!token) {
            return { props: {} };
        }
        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const user = await User.findById(data.id).select("-password")
        return { props: { user } };
    } catch (error) {
        console.log(error);
        return { props: {} };
    }
}

