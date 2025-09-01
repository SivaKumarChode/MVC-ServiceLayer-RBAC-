import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Refresh-Token-Level-4")
        console.log(`Data base connected successfully`);
    
    } catch (error) {
        console.log(error.message);
    }
}