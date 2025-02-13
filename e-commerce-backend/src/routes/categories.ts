import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createCategories, deletecategories, getCategories, updateCategories } from "../controllers/categoriesController";

const router=Router();

router.post("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   createCategories(req,res)
});

router.get("/",async(req:Request,res:Response)=>{
   getCategories(req,res);
});

router.delete("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   deletecategories(req,res);
});

router.patch("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   updateCategories(req,res)
})

export default router;