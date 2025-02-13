import express,{Request,Response} from "express";
import { addCartItem, deleteCartItem, getCartItems, updateCartItemQuantity } from "../controllers/cartController"; // Import the controller functions

const router = express.Router();

router.post("/",async(req:Request,res:Response)=>{
    addCartItem(req,res);
})

router.get("/",async(req:Request,res:Response)=>{
    getCartItems(req,res);
})

router.delete("/cart/:cartItemID",async(req:Request,res:Response)=>{
    deleteCartItem(req,res);
});

router.patch("/cart/:cartItemID", async(req:Request,res:Response)=>{
    updateCartItemQuantity(req,res);
});

export default router;