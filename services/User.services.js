import { User } from "../models/User.model.js";
import { Token } from "../models/Token.model.js";
import jwt from "jsonwebtoken"



import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

export const userServices = {
  register: async (username, email, password, confirmPassword, role) => {
    try {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email is already exists");
      }
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  },
  login:async(data)=>{
    // console.log("data--->",data.email);
    
        try {
            const user= await User.findOne({email:data.email})
            // console.log(user);
            
            if(!user){
              throw new Error("email not found !!");
            }

            const isMatch=await user.comparePassword(data.password)
            if(!isMatch){
              throw new Error("Password not matching !");
            }

            const accessToken = await generateAccessToken(user)
            const refreshToken =await generateRefreshToken(user)

            // console.log(user);
            // console.log("access--",accessToken);
            // console.log("refresh---",refreshToken);
            
            return {loginUser:user , accessToken , refreshToken }
        } catch (error) {
            console.log(error);
        }
    },
    refresh:async(refreshToken)=>{
      // console.log(refreshToken);
      
        try { 
            const token =await Token.findOne({token:refreshToken})
            if(!token){
              throw new Error("Refresh Token not stored inDB");
            }
            
            const decode=jwt.verify(refreshToken,"asdfghjkl")
            
            const NewAccessToken=generateAccessToken({
              _id:decode.userId,
              role:decode.userRole
            })

            return NewAccessToken
        } catch (error) {
            console.log(error.message);
        }
    }
};
