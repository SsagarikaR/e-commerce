import { Request,Response,NextFunction } from "express";
import { createOrder } from "../services/db/orders";

//add a new order
export const createNewOrder=async(req:Request,res:Response,next:NextFunction)=>{
    const userID=req.body.user.identifire
    const {productID,productPrice,address,quantiy}=req.body;
    try{
        if(!productID){
            return next({statusCode:409,message:"Please enter the product ."})
        }

        const [result,metaData]=await createOrder(userID,productID,productPrice,address,quantiy);
        if(metaData>0){
           return res.status(201).json({message:"Successfully ordered this product."})
        }
        else{
            return next({statusCode:409,message:"Error in adding review, Please try again!"});
        }
        
    }catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: "Error in adding review, Please try again!" });
    }
}