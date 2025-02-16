import { generateToken } from "../middlewear/authentication";
import { sequelize } from "../config/databse";
import bcrypt from "bcrypt"
import { Request,Response } from "express";
import { QueryTypes } from "sequelize";
import { forUser } from "interface/interface";

export const createUser=async(req:Request,res:Response)=>{
    const {name,email,contactNo,role,password}=req.body
    try{
        if( name===""  || name===undefined || !name){
            return res.status(404).json({error:"Name can't be empty"});
        }
        if(email==="" || email===undefined || !email){
            return res.status(404).json({error:"Email can't be empty"});
        }
        if(contactNo==="" || contactNo===undefined || !contactNo){
            return res.status(404).json({error:"Contact No. can't be empty."});
        }
        if(role==="" || role===undefined || !role){
            return res.status(404).json({error:"User's role can't be empty."});
        }
        if(password==="" || password===undefined || !password){
            return res.status(404).json({error:"User's role can't be empty."});
        }

        const ifUserExistWithName=await sequelize.query(`SELECT * FROM Users WHERE name=? `,
            {
                replacements:[name],
                type:QueryTypes.SELECT
            }
        );
        if(ifUserExistWithName.length!==0){
            return res.status(403).json({error:"This user name is already taken"});
        }
        const ifUserExistWithEmail=await sequelize.query(`SELECT * FROM Users WHERE email=?`,
            {
                replacements:[email],
                type:QueryTypes.SELECT
            }
        );
        if(ifUserExistWithEmail.length!==0){
            return res.status(403).json({error:"This user email is already registered"});
        }
      
        const hashedPassword=await bcrypt.hash(password,10);
        const [result,metaData]=await sequelize.query(`INSERT INTO Users (name,email,contactNo,role,password) VALUES
            (?,?,?,?,?)`,{
                replacements:[name,email,contactNo,role,hashedPassword],
                type:QueryTypes.INSERT
            })
        if(metaData!==0){
            const token=await generateToken(result);
            return res.status(201).json(token);
        }
        else{
            return res.status(409).json({error:"Error creating a new user."});
        }
    }
    catch(error){
        console.log(error,"error creating  user")
        return res.status(500).json({message:"Please try again after sometimes!"});
        // nextTick
    }
}


export const getUser=async(req:Request,res:Response)=>{
    const {name,contactNo,password}=req.body;
    try{
        if( name===""  || name===undefined || !name){
            return res.status(404).json({error:"Name can't be empty"});
        }
        if(contactNo==="" || contactNo===undefined || !contactNo){
            return res.status(404).json({error:"Contact No. can't be empty."});
        }
        if(password==="" || password==undefined || !password){
            return res.status(404).json({error:"User's role can't be empty."});
        }

        const user:forUser[]=await sequelize.query(`SELECT * FROM Users WHERE name=? AND  contactNo=?  `,
            {
                replacements:[name,contactNo],
                type:QueryTypes.SELECT
            }
        );
       
        if(user.length!==0){
            if(user[0].password){
                const isPasswordValid=await bcrypt.compare(password,user[0].password)
                if(!isPasswordValid){
                    return res.status(403).json({message:"Invalid password."})
                }
            }
            // console.log(user)
            // console.log(user[0].userID)
            const token=await generateToken(user[0].userID)
            console.log(token,"token")
            const userToReturn=user[0]
            userToReturn.token=token
            delete userToReturn.password;
            return res.status(200).json(userToReturn);
        }
        else{

            return res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        console.log(error,"error creating  user")
        return res.status(500).json({message:"Please try again after sometimes!"});
    }
}