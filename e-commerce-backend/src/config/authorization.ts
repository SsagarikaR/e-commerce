import { Request,Response,NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import { sequelize } from "./databse";
import { QueryTypes } from "sequelize";
dotenv.config();

export const checkToken=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
         res.status(401).json({error:"Token not found"})
    }
    console.log(authHeader,"authHeader");
    const token=authHeader!.split(' ')[1];
    try{
        if(process.env.JWT){
            const decoded=Jwt.verify(token,process.env.JWT)
            req.body.user=decoded;
            next();
        }
    }
    catch(error){
        console.log(error,"error");
        res.status(401).json({error:"Unauthorized"})
    }
}

export const isAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.body.user.identifire;
    console.log("route hit")
    try{
        const user:forUser[]=await sequelize.query('SELECT * FROM Users WHERE userID=?',
            {
                replacements:[id],
                type:QueryTypes.SELECT
            }
        )
        if(user.length===0){
            res.status(404).json({error:"User not found."})
        }
        else{
            if(user[0].role!=="Admin"){
                 res.status(403).json({error:"You are not authorized for this action."})
            }
           next();
        }
    }
    catch(error){
        res.status(500).json({errro:"Please try again after sometimes"})
    }
}