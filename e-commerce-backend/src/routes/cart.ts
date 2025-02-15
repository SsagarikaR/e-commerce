import express,{Request,Response} from "express";
import { addCartItem, deleteCartItem, getCartItems, updateCartItemQuantity } from "../controllers/cartController"; // Import the controller functions
import { checkToken } from "../middlewear/authorization";

const router = express.Router();

router.post("/",checkToken,async(req:Request,res:Response)=>{
    addCartItem(req,res);
})

router.get("/",checkToken,async(req:Request,res:Response)=>{
    getCartItems(req,res);
})

router.delete("/",checkToken,async(req:Request,res:Response)=>{
    deleteCartItem(req,res);
});

router.patch("/", checkToken,async(req:Request,res:Response)=>{
    updateCartItemQuantity(req,res);
});

export default router;