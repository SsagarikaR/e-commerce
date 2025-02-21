import { NextFunction, Request, Response, Router } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createPreference, deletePreference, fetchPreferences, updatePreference } from "../controllers/prefernceController";

const router = Router();


router.post("/",(req:Request,res:Response,next:NextFunction)=>{
    createPreference(req,res,next);
})

router.get("/",(req:Request,res:Response,next:NextFunction)=>{
   fetchPreferences(req,res,next)
})

router.patch("/",(req:Request,res:Response,next:NextFunction)=>{
    updatePreference(req,res,next)
})

router.delete("/",(req:Request,res:Response,next:NextFunction)=>{
    deletePreference(req,res,next)
 })

 export default router;