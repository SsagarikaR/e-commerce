import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { deleteUser, getAllUser, updateUserPassword ,getUserByID} from "../controllers/userController";
const router=Router();

router.get("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
    getAllUser(req,res);
});

router.get("/id",checkToken,async(req:Request,res:Response)=>{
    getUserByID(req,res);
});

router.delete("/",checkToken,async(req:Request,res:Response)=>{
    deleteUser(req,res);
});

router.patch("/",checkToken,async(req:Request,res:Response)=>{
    updateUserPassword(req,res);
})

export default router;