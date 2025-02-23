import { Router,Request,Response, NextFunction } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { addReview,deleteReview, getReviewsOfProduct, updateReview } from "../controllers/reviewController";
import { Reviews } from "models/Review";

const router=Router();

router.post("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    addReview(req,res,next);
});


router.get("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    getReviewsOfProduct(req,res,next);
});

router.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
   updateReview(req,res,next);
});

router.delete("/",async(req:Request,res:Response,next:NextFunction)=>{
 deleteReview(req,res,next);
});

export default router;