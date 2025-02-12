import { sequelize } from "../config/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { error } from "console";

export const deleteUser=async(req:Request,res:Response)=>{
    const id=req.body.user.identifire;
    try{
        if(!id){
            return res.status(404).json({error:"User id not found"})
        }
        const IsUserExist=await sequelize.query('SELECT * FROM Users WHERE userID=?',
            {
                replacements:[id],
                type:QueryTypes.SELECT
            }
        );
        if(IsUserExist.length===0){
            return res.status(404).json({error:"User not found"})
        }
        const deleteUser=await sequelize.query('DELETE FROM Users WHERE userID=?',
            {
                replacements:[id],
                type:QueryTypes.DELETE
            }
        )
        console.log("deleted user:",deleteUser);
        return res.status(200).json({message:"user dleted successfully"});
    }
    catch(error){
        console.log(error,"errro");
        return res.status(500).json({errro:"Please try again after sometimes!"});
    }
}

export const updateUserPassword=async(req:Request,res:Response)=>{
    const {newPassword,oldPassword}=req.body;
    const id=req.body.user.identifire
    try{
        const isUserExist:forUser[]=await sequelize.query('SELECT * FROM Users WHERE userID=?',{
            replacements:[id],
            type:QueryTypes.SELECT
        })
        if(isUserExist.length===0){
            return res.status(404).json({error:"User not found"});
        }
        if(isUserExist[0].password){
            const isPasswordValid=await bcrypt.compare(oldPassword,isUserExist[0].password)
            if(!isPasswordValid){
                return res.status(403).json({error:"Invalid password."})
            }
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        const updateUser=await sequelize.query('UPDATE Users SET password=?',
            {
                replacements:[hashedPassword],
                type:QueryTypes.UPDATE
            }
        )
        console.log(updateUser,"updateuser");
         if(updateUser[1]!==0){
            return res.status(200).json({message:"User updated successfully"});
         }
         else{
            return res.status(409).json({error:"Error updating user"})
         }
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"})
    }
}

export const getAllUser=async(req:Request,res:Response)=>{
    try{
        const users=await sequelize.query(`SELECT * FROM Users`,{
            type:QueryTypes.SELECT
        })
        if(users.length===0){
            return res.status(404).json({error:"No user found"});
        }
        return res.status(200).json(users)
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"});
    }
}