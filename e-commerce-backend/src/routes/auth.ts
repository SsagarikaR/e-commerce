import { createUser, getUser } from "../controllers/authController";
import { NextFunction, Request,Response,Router } from "express";

const router=Router();

router.post("/signup",async(req:Request,res:Response)=>{
    createUser(req,res);
})

router.post("/login",async(req:Request,res:Response)=>{
    getUser(req,res);
})

export default router;