import { User } from "@/models/user";
import mongoose from "mongoose"

export const connectDb = async () => {
    try {
       const {connection} = await mongoose.connect(process.env.MONGO_DB_URL);
       console.log("DB connected...");
       console.log("connected with host: " + connection.host);
       console.log("connected with name: " + connection.name);

    } catch (error) {
        console.log(error);
        console.log("Fail to connect with Database.");
    }
}