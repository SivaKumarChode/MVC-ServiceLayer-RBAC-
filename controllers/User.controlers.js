import e from "cors";
import { userServices } from "../services/User.services.js";

export const userControllers = {
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword, role } = req.body;
      if (!username || !email || !password || !confirmPassword || !role) {
        return res.status(400).json({
          message: "All Fields are required !",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Password not matching ",
        });
      }

      const registerUser = await userServices.register(
        username,
        email,
        password,
        confirmPassword,
        role
      );
      if (!registerUser) {
        return res.status(400).json({
          message: "register user not found !!",
        });
      }

      res.status(200).json({
        message: "User Register Successfully",
        registerUser: registerUser,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { loginUser, accessToken, refreshToken } = await userServices.login(
        req.body
      );
      if (!loginUser) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
      // console.log(res.cookies);
      // console.log(req.cookies);

      res.status(200).json({
        message: "User Login successfully",
        loginUser: loginUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.log(error);
    }
  },
  refresh: async (req, res) => {
    try {
      const {refreshToken}= req.cookies;
      console.log(refreshToken);
      
      if(!refreshToken){
        return res.status(400).json({
          message:"Refresh Token not in cookies !!"
        })
      }

      const token=await userServices.refresh(refreshToken)
      if(!token){
        return res.status(400).json({
          message:"Token not found !!"
        })
      }

      res.status(200).json({
        message:"New Access Token created successfully",
        NewAccessToken:token
      })
      
    } catch (error) {
      console.log(error.message);
    }
  },
};
