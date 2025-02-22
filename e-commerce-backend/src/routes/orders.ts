import { NextFunction, Request, Response, Router } from "express";
import { checkToken } from "../middlewear/authorization";
import { createOrder, deleteOrder, fetchUserOrders, updateOrderAddress, updateOrderStatusToCancelled } from "../controllers/orderController";

const router = Router();


router.post("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
   createOrder(req,res,next);
})

router.get("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
   fetchUserOrders(req,res,next);
})

router.patch("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
  updateOrderAddress(req,res,next);
})

router.patch("/status",checkToken,(req:Request,res:Response,next:NextFunction)=>{
   updateOrderStatusToCancelled(req,res,next);
})

router.delete("/",checkToken,(req:Request,res:Response,next:NextFunction)=>{
   deleteOrder(req,res,next);
 })

 export default router;