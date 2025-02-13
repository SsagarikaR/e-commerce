import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createProduct, deleteProducts, getProducts, updateProduct } from "../controllers/productController";

const router=Router();

router.post("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
    createProduct(req,res);
})

router.get("/",async(req:Request,res:Response)=>{
   getProducts(req,res);;
});

router.delete("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   deleteProducts(req,res);
});

router.patch("/",checkToken,isAdmin,async(req:Request,res:Response)=>{
   updateProduct(req,res);
})

export default router;