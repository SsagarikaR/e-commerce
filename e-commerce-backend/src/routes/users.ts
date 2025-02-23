import { Router,Request,Response, NextFunction } from "express";
import { isAdmin } from "../middlewear/authorization";
import { checkToken } from "../middlewear/authentication";
import { deleteUser, getAllUser, updateUserPassword ,getUserByID} from "../controllers/userController";
import { validateUpdatePassword } from "../middlewear/validationHelper/validateUserData";
const router=Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * securityDefinitions:
 *   authorization:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: "JWT Token required for authentication"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Forbidden, only admins can access
 *       500:
 *         description: Server error
 */
router.get("/users", checkToken, isAdmin, async (req: Request, res: Response,next:NextFunction) => {
    getAllUser(req, res,next);
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/user", checkToken, async (req: Request, res: Response,next:NextFunction) => {
    getUserByID(req, res,next);
});

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the user
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/users", checkToken, async (req: Request, res: Response,next:NextFunction) => {
    deleteUser(req, res,next);
});

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Successfully updated the password
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch("/users", checkToken,validateUpdatePassword, async (req: Request, res: Response,next:NextFunction) => {
    updateUserPassword(req, res,next);
});

export default router