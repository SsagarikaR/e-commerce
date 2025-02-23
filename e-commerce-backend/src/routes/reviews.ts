import { Router,Request,Response, NextFunction } from "express";
import { checkToken } from "../middlewear/authentication";
import { addReview,deleteReview, getReviewsOfProduct, updateReview } from "../controllers/reviewController";

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
 * /reviews:
 *   post:
 *     summary: Add a new review for a product
 *     tags: [Review]
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
 *               - rating
 *               - description
 *             properties:
 *               productID:
 *                 type: integer
 *                 description: The ID of the product being reviewed
 *               rating:
 *                 type: integer
 *                 description: The rating given to the product (0-5)
 *               description:
 *                 type: string
 *                 description: The review text describing the user's experience with the product
 *     responses:
 *       201:
 *         description: Review added successfully
 *       401:
 *         description: User not authenticated or missing
 *       409:
 *         description: Invalid input 
 *       500:
 *         description: Server error
 */
router.post("/",checkToken,async(req:Request,res:Response,next:NextFunction)=>{
    addReview(req,res,next);
});



/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to fetch reviews for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *       404:
 *         description: No reviews found for the product
 *       500:
 *         description: Server error
 */
router.get("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    getReviewsOfProduct(req,res,next);
});



/**
 * @swagger
 * /reviews:
 *   patch:
 *     summary: Update an existing review
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewID
 *               - rating
 *               - description
 *             properties:
 *               reviewID:
 *                 type: integer
 *                 description: The ID of the review to update
 *               rating:
 *                 type: integer
 *                 description: The new rating for the review (0-5)
 *               description:
 *                 type: string
 *                 description: The updated review description
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Review not found or not updated
 *       500:
 *         description: Server error
 */
router.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
   updateReview(req,res,next);
});



/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Delete an existing review
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewID
 *             properties:
 *               reviewID:
 *                 type: integer
 *                 description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Missing review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete("/",async(req:Request,res:Response,next:NextFunction)=>{
 deleteReview(req,res,next);
});

export default router;