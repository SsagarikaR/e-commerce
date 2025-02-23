import { Router,Request,Response, NextFunction } from "express";
import { checkToken } from "../middlewear/authentication";
import { addToWishList, deleteWishListItem, getWishListItemById, getWishListItems } from "../controllers/wishListController";

const router=Router();


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
 * /wishlist:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [WishList]
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
 *             properties:
 *               productID:
 *                 type: integer
 *                 description: The ID of the product to add to the wishlist
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       403:
 *         description: Unable to add product to wishlist (product already in wishlist or other errors)
 *       500:
 *         description: Server error
 */
router.post("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    addToWishList(req,res,next);
})



/**
 * @swagger
 * /wishlist/{id}:
 *   get:
 *     summary: Get a specific product in the wishlist by ID
 *     tags: [WishList]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch from the wishlist
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Wishlist item retrieved successfully
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Server error
 */
router.get("/:id",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    getWishListItemById(req,res,next);
})



/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get all products in the user's wishlist
 *     tags: [WishList]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of products in the wishlist
 *       404:
 *         description: No products found in the wishlist
 *       500:
 *         description: Server error
 */
router.get("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    getWishListItems(req,res,next);
})



/**
 * @swagger
 * /wishlist:
 *   delete:
 *     summary: Delete an item from the user's wishlist
 *     tags: [WishList]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wishListID
 *             properties:
 *               wishListID:
 *                 type: integer
 *                 description: The ID of the wishlist item to delete
 *     responses:
 *       200:
 *         description: Wishlist item deleted successfully
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Server error
 */
router.delete("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    deleteWishListItem(req,res,next);
})

export  default router