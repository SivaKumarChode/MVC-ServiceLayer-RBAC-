
export const RoleBase=(accessUser)=>{
    console.log(accessUser);
    
   return (req , res ,next)=>{
        try {
            const userRole= req.user?.userRole
            console.log("userRole--->",userRole);
            
            if(!userRole){
                return res.status(400).json({
                    message:"Unauthorized - No role found"
                })
            }

            if(!accessUser.includes(userRole)){
                return res.status(400).json({
                    message:"Access Denied"
                })
            }

            next()
        } catch (error) {
            console.log(error.message);
        }
   }
}