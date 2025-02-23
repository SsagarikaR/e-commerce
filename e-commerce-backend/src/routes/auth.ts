import { validateSignUpData ,validateSignInData} from "../middlewear/validationHelper/validateUserData";
import { createUser, getUser } from "../controllers/authController";
import { NextFunction, Request,Response,Router } from "express";

const router=Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     description: Creates a new user account if the username and email are not already taken.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - contactNo
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               password:
 *                 type: string
 *               role: 
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Error creating new user
 *       500:
 *         description: Internal server error
 */
router.post("/signup",validateSignUpData,async(req:Request,res:Response,next:NextFunction)=>{
    createUser(req,res,next);
})


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     description:  Logs in a user if credentials match an existing account..
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contactNo
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               contactNo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login",validateSignInData,async(req:Request,res:Response,next:NextFunction)=>{
    getUser(req,res,next);
})

export default router;