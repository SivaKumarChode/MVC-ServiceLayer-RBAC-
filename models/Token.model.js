import mongoose from "mongoose";

const TokenSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

export const Token = mongoose.model("Token",TokenSchema)