import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
          required:true
    },
    password:{
        type:String,
          required:true
    },
    confirmPassword:{
        type:String,
        validate:{
            validator:function(value){
                return value === this.password
            },
            message:"Password is not matching"
        },
    },
    role:{
        type:String,
        enum:["user","admin","parent"],
        default:"user"
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    try {
        if(!this.isModified("password")) return next()
        
        const salt=await bcrypt.genSalt(12)
        this.password=await bcrypt.hash(this.password,salt)

        this.confirmPassword = undefined
        next()
    } catch (error) {
        console.log(error.message);
    }
})

userSchema.methods.comparePassword =async function (comparePassword) {
    try {
        if(!comparePassword) console.log("compare Password not found !");
        return await bcrypt.compare(comparePassword,this.password)
        } catch (error) {
        console.log(error.message);
    }
}


export const User= mongoose.model("User",userSchema)