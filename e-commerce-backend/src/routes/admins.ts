import { adminLogin, createAdmin, deleteAdmin, updateAdmin } from "../controllers/adminController";
import { NextFunction, Request, Response, Router } from "express";
import { checkToken, isAdmin } from "../middlewear/authorization";

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
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *             properties:
 *               userID: 
 *                 type: integer
 *                 description: ID of the user to be added as an admin
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       409:
 *         description: Conflict, admin already exists or missing userID
 *       500:
 *         description: Server error
 */
router.post("/", checkToken, isAdmin, (req: Request, res: Response, next: NextFunction) => {
 createAdmin(req, res, next);
});


/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Admin login
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin login successful
 *       409:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.get("/", checkToken, isAdmin, (req: Request, res: Response, next: NextFunction) => {
 adminLogin(req, res, next);
});


/**
 * @swagger
 * /admins:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         description: ID of the user to be deleted as an admin
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.delete("/",checkToken,isAdmin,(req:Request,res:Response,next:NextFunction)=>{
    deleteAdmin(req,res,next);
})


/**
 * @swagger
 * /admins:
 *   patch:
 *     summary: Update an admin
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *               - newUserID
 *             properties:
 *               userID: 
 *                 type: integer
 *                 description: ID of the user to be updated
 *               newUserID: 
 *                 type: integer
 *                 description: New ID to replace the old one
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.patch("/",checkToken,isAdmin,(req:Request,res:Response,next:NextFunction)=>{
    updateAdmin(req,res,next);
})

export default router;
