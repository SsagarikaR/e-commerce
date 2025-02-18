import { Router, Request, Response, NextFunction } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { createCategories, deleteCategories, getCategories, updateCategories } from "../controllers/categoriesController";

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
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - categoryThumbnail
 *             properties:
 *               categoryName: { type: string }
 *               categoryThumbnail: { type: string }
 *     responses:
 *       201:
 *         description: Successfully added a new category
 *       409:
 *         description: Error in adding a new category
 *       500:
 *         description: Server error
 */
router.post("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
    createCategories(req, res,next);
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories or filter by name
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter categories by name (optional)
 *     responses:
 *       200:
 *         description: List of matching categories or all categories if no filter is applied
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */

router.get("/", async (req: Request, res: Response,next:NextFunction) => {
    getCategories(req, res,next);
});

/**
 * @swagger
 * /categories:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryID
 *             properties:
 *               categoryID: { type: integer }
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
    deleteCategories(req, res,next);
});

/**
 * @swagger
 * /categories:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryID
 *               - categoryName
 *               - categoryThumbnail
 *             properties:
 *               categoryID: { type: integer }
 *               categoryName: { type: string }
 *               categoryThumbnail: { type: string }
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *       500:
 *         description: Server error
 */
router.patch("/", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
    updateCategories(req, res,next);
});

export default router;
