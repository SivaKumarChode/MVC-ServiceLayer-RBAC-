import jwt from "jsonwebtoken";
import { Token } from "../models/Token.model.js";

export const generateAccessToken = async (user) => {
  return jwt.sign({ userId: user._id, userRole: user.role }, "qwertyuiop", {
    expiresIn: "2m",
  });
};

export const generateRefreshToken = async (user) => {
  const refresh= jwt.sign({ userId: user._id, userRole: user.role }, "asdfghjkl", {
    expiresIn: "7d",
  });

  const expiresIn=new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newToken= new Token({
      userId:user._id,
      token:refresh,
      expiresAt:expiresIn
  })
  await newToken.save()
  return refresh
};
