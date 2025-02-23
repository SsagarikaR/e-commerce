import { Request,Response,NextFunction } from "express";
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


export const checkToken=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next({statusCode:401,message:"Authentication required."})
    }
    console.log(authHeader,"authHeader");
    const token=authHeader!.split(' ')[1];
    try{
        if(process.env.JWT){
            const decoded=Jwt.verify(token,process.env.JWT)
            req.body.user=decoded;
            console.log(req.body);
            next();
        }
    }
    catch(error){
        console.log(error,"error");
        res.status(401).json({error:"Unauthorized"})
    }
}
