import { NextFunction, Request, Response, Router } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createPreference, deletePreference, fetchPreferences, updatePreference } from "../controllers/prefernceController";

const router = Router();


router.post("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
    createPreference(req,res,next);
})

router.get("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
   fetchPreferences(req,res,next)
})

router.patch("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
    updatePreference(req,res,next)
})

router.delete("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
    deletePreference(req,res,next)
 })

 export default router;