import jwt from "jsonwebtoken"

export const Verify =async(req, res , next )=>{
    try {
        const Headers=req.headers.authorization
        if(!Headers || !Headers.startsWith("Bearer ")){
            return res.status(400).json({
                message:"Token not found in headers || not started with Bearer"
            })
        }
        const token =Headers.split(" ")[1]
        if(!token){
             return res.status(400).json({
                message:"Token not found !!"
            })
        }
        const decode=jwt.verify(token,"qwertyuiop")
        console.log("Decode---->",decode);
        
        console.log("middleware");
        
        req.user=decode

        next()
    } catch (error) {
        console.log(error.message);
    }
} 
