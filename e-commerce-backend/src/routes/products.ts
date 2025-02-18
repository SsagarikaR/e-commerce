import express, { NextFunction, Request, Response } from "express";
import { createProduct, deleteProducts, getProducts, updateProduct } from "../controllers/productController";
import { checkToken, isAdmin } from "../middlewear/authorization";

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
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productDescription
 *               - productThumbnail
 *               - productPrice
 *               - categoryID
 *             properties:
 *               productName: { type: string }
 *               productDescription: { type: string }
 *               productThumbnail: { type: string }
 *               productPrice: { type: number }
 *               categoryID: { type: integer }
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Product already exists
 *       500:
 *         description: Server error
 */
router.post("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
    createProduct(req, res,next);
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           enum: [low-to-high, high-to-low]
 *         description: Sort products by price
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: Filter by product ID
 *     responses:
 *       200:
 *         description: List of products
 *       404:
 *         description: No products found
 *       500:
 *         description: Server error
 */
router.get("/", async (req: Request, res: Response,next:NextFunction) => {
   getProducts(req, res,next);
});

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
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
 *               productID: { type: integer }
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
   deleteProducts(req, res,next);
});

/**
 * @swagger
 * /products:
 *   patch:
 *     summary: Update product details
 *     tags: [Product]
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
 *               - productName
 *               - productDescription
 *               - productThumbnail
 *               - productPrice
 *               - categoryID
 *             properties:
 *               productID: { type: integer }
 *               productName: { type: string }
 *               productDescription: { type: string }
 *               productThumbnail: { type: string }
 *               productPrice: { type: number }
 *               categoryID: { type: integer }
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.patch("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
   updateProduct(req, res,next);
});

export default router;
