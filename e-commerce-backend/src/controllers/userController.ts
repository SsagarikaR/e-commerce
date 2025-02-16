import { sequelize } from "../config/databse";
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { forUser } from "interface/interface";
import { deleteUserByID, selectUserByID ,updateUsersPassword} from "../services/db/users";

export const deleteUser=async(req:Request,res:Response)=>{
    const id=req.body.user.identifire;
    try{
        if(!id){
            return res.status(404).json({error:"User id not found"})
        }

        const IsUserExist=await selectUserByID(id);

        if(IsUserExist.length===0){
            return res.status(404).json({error:"User not found"})
        }
        const deleteUser=await deleteUserByID(id);
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
        const isUserExist:forUser[]=await selectUserByID(id);
        
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
        const updateUser=await updateUsersPassword(hashedPassword);
        console.log(updateUser,"updateuser");
        return res.status(200).json({message:"User updated successfully"});
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

export const getUserByID=async(req:Request,res:Response)=>{
    console.log(req.body)
    const id=req.body.user.identifire;
    try{
        const users:forUser[]=await selectUserByID(id);

        if(users.length===0){
            return res.status(404).json({error:"Invalid user id"});
        }
        delete users[0].password;
        return res.status(200).json(users[0])
    }
    catch(error){
        console.log(error,"error");
        return res.status(500).json({error:"Please try again after sometimes!"});
    }
}