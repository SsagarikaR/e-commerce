import { Router,Request,Response, NextFunction } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createBrand, deleteBrand, getAllBrands, updateBrand } from "../controllers/brandController";

const router=Router();

router.post("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
    createBrand(req,res);
})

router.get("/",async(req:Request,res:Response)=>{
   getAllBrands(req,res);;
});

router.delete("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   deleteBrand(req,res);
});

router.patch("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   updateBrand(req,res);
})

export default router;