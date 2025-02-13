import Jwt  from "jsonwebtoken"
require('dotenv').config()


export const generateToken=async(id:number)=>{
    // console.log(id,"authentication hit",process.env);
    try{
            const token=Jwt.sign(
                {identifire:id},
                process.env.JWT as string,
                {expiresIn:'7d'}
            )
            console.log(token,"generated token")
            return token
        
    }
    catch(error){
        console.log("error",error)
    }
}