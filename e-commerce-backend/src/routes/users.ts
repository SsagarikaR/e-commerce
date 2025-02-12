import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../config/authorization";
import { deleteUser, getAllUser, updateUserPassword } from "../controllers/userController";
const router=Router();

router.get("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
    getAllUser(req,res);
});

router.delete("/",checkToken,async(req:Request,res:Response)=>{
    deleteUser(req,res);
});

router.patch("/",checkToken,async(req:Request,res:Response)=>{
    updateUserPassword(req,res);
})

export default router;