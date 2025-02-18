import { adminLogin, createAdmin } from "../controllers/adminController";
import { NextFunction, Request, Response, Router } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createBrands, deleteBrands, getBrands, updateBrands } from "../controllers/brandControllers";

const router = Router();

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
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brand]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - brandDescription
 *             properties:
 *               brandName: { type: string }
 *               brandDescription: { type: string }
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       403:
 *         description: Unauthorized to create brand
 *       500:
 *         description: Server error
 */
router.post("/", checkToken, isAdmin, (req: Request, res: Response, next: NextFunction) => {
  createBrands(req, res, next);
});

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get a list of brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of brands
 *       404:
 *         description: No brands found
 *       500:
 *         description: Server error
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  getBrands(req, res, next);
});

/**
 * @swagger
 * /brands:
 *   patch:
 *     summary: Update brand details
 *     tags: [Brand]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandID
 *               - brandName
 *               - brandDescription
 *             properties:
 *               brandID: { type: integer }
 *               brandName: { type: string }
 *               brandDescription: { type: string }
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       403:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.patch("/", checkToken, isAdmin, (req: Request, res: Response, next: NextFunction) => {
  updateBrands(req, res, next);
});


/**
 * @swagger
 * /brands:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brand]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandID
 *             properties:
 *               brandID: { type: integer }
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.delete("/", checkToken, isAdmin, (req: Request, res: Response, next: NextFunction) => {
  deleteBrands(req, res, next);
});

export default router;
