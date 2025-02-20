import { Router,Request,Response, NextFunction } from "express";
import { checkToken } from "../middlewear/authorization";
import { addToWishList, deleteWishListItem, getWishListItemById, getWishListItems } from "../controllers/wishListController";

const router=Router();

router.post("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    addToWishList(req,res,next);
})


router.get("/:id",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    getWishListItemById(req,res,next);
})

router.get("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    getWishListItems(req,res,next);
})


router.delete("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    deleteWishListItem(req,res,next);
})

export  default router