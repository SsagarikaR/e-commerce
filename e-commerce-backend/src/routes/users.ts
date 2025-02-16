import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";
import { deleteUser, getAllUser, updateUserPassword ,getUserByID} from "../controllers/userController";
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
router.get("/users", checkToken, isAdmin, async (req: Request, res: Response) => {
    getAllUser(req, res);
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
router.get("/user", checkToken, async (req: Request, res: Response) => {
    getUserByID(req, res);
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
router.delete("/users", checkToken, async (req: Request, res: Response) => {
    deleteUser(req, res);
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
router.patch("/users", checkToken, async (req: Request, res: Response) => {
    updateUserPassword(req, res);
});

export default router