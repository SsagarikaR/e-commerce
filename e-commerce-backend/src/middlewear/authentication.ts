import { Request,Response,NextFunction } from "express";
import Jwt  from "jsonwebtoken"
require('dotenv').config()


export const generateToken=async(id:number)=>{
    try{
            const token=Jwt.sign(
                {identifire:id},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn:'7d'}
            )
            return token
        
    }
    catch(error){
        console.log("error",error)
    }
}


export const checkToken=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next({statusCode:401,message:"Authentication required."})
    }
    const token=authHeader!.split(' ')[1];
    try{
        if(process.env.JWT_SECRET_KEY){
            const decoded=Jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.body.user=decoded;
            next();
        }
    }
    catch(error){
        res.status(401).json({error:"Unauthorized"})
    }
}
