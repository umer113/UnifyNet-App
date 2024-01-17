import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
       const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`MongoDB : ${connection.connection.host}`)
       console.log("Database is Connected!")
        
    } catch (error) {
        console.log("error:",error)
        process.exit(1)
    }
}

export default connectDB;