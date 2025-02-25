import { Request,Response,NextFunction } from "express";
import dotenv from "dotenv";
import { sequelize } from "../config/databse";
import { QueryTypes } from "sequelize";
dotenv.config();


export const isAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.body.user.identifire;
    try{
        const user:user[]=await sequelize.query('SELECT * FROM Admins WHERE userID=?',
            {
                replacements:[id],
                type:QueryTypes.SELECT
            }
        )
        if(user.length===0){
            res.status(403).json({error:"You are not authorized for this action."});
            next();
        }
        next();
    }
    catch(error){
        res.status(500).json({error:"Please try again after sometimes"})
    }
}

