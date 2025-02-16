import express,{Request,Response} from "express";
import { addCartItem, deleteCartItem, getCartItems, updateCartItemQuantity } from "../controllers/cartController"; // Import the controller functions
import { checkToken } from "../middlewear/authorization";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * securityDefinitions:
 *   authorization:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: "JWT Token required for authentication"
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productID
 *               - quantity
 *             properties:
 *               productID: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       201:
 *         description: Product added to cart
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post("/",checkToken,async(req:Request,res:Response)=>{
    addCartItem(req,res);
})

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all cart items for the authenticated user
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get("/",checkToken,async(req:Request,res:Response)=>{
    getCartItems(req,res);
})

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemID
 *             properties:
 *               cartItemID: { type: integer }
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.delete("/",checkToken,async(req:Request,res:Response)=>{
    deleteCartItem(req,res);
});

/**
 * @swagger
 * /cart:
 *   patch:
 *     summary: Update the quantity of an item in the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItemID
 *               - quantity
 *             properties:
 *               cartItemID: { type: integer }
 *               quantity: { type: integer }
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */
router.patch("/", checkToken,async(req:Request,res:Response)=>{
    updateCartItemQuantity(req,res);
});

export default router;