import { Request,Response,NextFunction } from "express";
import { selectByProductID } from "../services/db/products";
import { selectReviewByProductAndUser,
         addNewReview,
         selectReviewOfProduct,
         selectByReviewID,
         deleteReview,updateReview} from "../services/db/reviews";

//add a new review
export const addReview=async(req:Request,res:Response,next:NextFunction)=>{
    const userID=req.body.user.identifire
    const {productID,rating,description}=req.body;
    console.log(productID,rating,description)
    try{

        if (!userID) {
            return next({ statusCode: 400, message: "User not authenticated or missing." });
        }

        if(!productID || !(rating>=0 &&rating<=5) || !description){
            return next({statusCode:409,message:"Please enter all the require fields."})
        }
        const isAlreadyExist=await selectReviewByProductAndUser(userID,productID)
        if(isAlreadyExist.length>0){
           return next({statusCode:403,message:"You have already added review for this product."})
        }

        const [result,metaData]=await addNewReview(userID,productID,rating,description);
        if(metaData>0){
           return res.status(201).json({message:"Thank you for adding review."})
        }
        else{
            return next({statusCode:409,message:"Error in adding review, Please try again!"});
        }
        
    }catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
}


export const getReviewOfProduct=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    try{
        if(!id ){
            return next({statusCode:409,message:"Please enter the product id to fetch reviews for this product."})
        }

        const isProductExist=await selectByProductID(Number(id));
        if(isProductExist.length===0){
            return next({statusCode:404,message:"This product doesn't exist."})
        }

        const review=await selectReviewOfProduct(Number(id))
        if(review.length===0){
           return next({statusCode:403,message:"No review found."})
        }
        else{
            return res.status(200).json(review)
        }
        
    }catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
}

export const updateYourReview=async(req:Request,res:Response,next:NextFunction)=>{
    const userID=req.body.user.identifire
    const {reviewID,rating,description}=req.body;
    try{
        
        if(!reviewID ){
            return next({statusCode:409,message:"Please enter the reviews id to fetch reviews for this product."})
        }

        if(!rating || !description){
            return next({statusCode:404,message:"No review  exist for this review ID."})
        }

        const isReviewExist=await selectByReviewID(reviewID);
        if(isReviewExist.length===0){
            return next({statusCode:404,message:"No review  exist for this review ID."})
        }

        await updateReview(userID,reviewID,rating,description)
        return res.status(200).json({message:"Review updated successfully"})
        
    }catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
}


export const deleteYourReview=async(req:Request,res:Response,next:NextFunction)=>{
    const userID=req.body.user.identifire
    const {reviewID}=req.body;
    try{
        if(!reviewID ){
            return next({statusCode:409,message:"Please enter the reviews id to fetch reviews for this product."})
        }

        const isReviewExist=await selectByReviewID(reviewID);
        if(isReviewExist.length===0){
            return next({statusCode:404,message:"No review  exist for this review ID."})
        }
        
        await deleteReview(userID,reviewID);

        return res.status(200).json({message:"Review deleted succesfully"})
    }catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
}