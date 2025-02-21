import { Router,Request,Response, NextFunction } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { addReview, deleteYourReview, getReviewOfProduct, updateYourReview } from "../controllers/reviewController";
import { Reviews } from "models/Review";

const router=Router();

router.post("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    addReview(req,res,next);
});


router.get("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    getReviewOfProduct(req,res,next);
});

router.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
    updateYourReview(req,res,next);
});

router.delete("/",async(req:Request,res:Response,next:NextFunction)=>{
   deleteYourReview(req,res,next);
});

export default router;