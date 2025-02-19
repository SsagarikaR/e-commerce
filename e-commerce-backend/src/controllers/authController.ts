import { generateToken } from "../middlewear/authentication";
import bcrypt from "bcrypt"
import { Request,Response ,NextFunction} from "express";
import { createNewUser, selectUserByEmail, selectUserByName} from "../services/db/users";


//Creates a new user.
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, contactNo, password } = req.body;
    try {
        if (!name || !email || !contactNo || !password) {
            return next({ statusCode: 409, message: "Please enter required credentials" });
        }

        const ifUserExistWithName = await selectUserByName(name);
        if (ifUserExistWithName.length !== 0) {
            return next({ statusCode: 403, message: "This username is already taken" });
        }

        const ifUserExistWithEmail = await selectUserByEmail(email);
        if (ifUserExistWithEmail.length !== 0) {
            return next({ statusCode: 403, message: "This email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result, metaData] = await createNewUser(name, email, contactNo, hashedPassword);
        if (metaData !== 0)
        {
            // Generate a JWT token for the user
            const token = await generateToken(result);
            return res.status(201).json({ token });
        } 
        else {
            return next({ statusCode: 409, message: "Error creating a new user." });
        }
    } catch (error) {
        console.log("Error creating user:", error);
        return next({ statusCode: 500, message: "An error occurred while signing up" }); 
    }
};







//  Retrieves user information based on email and password.
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return next({ statusCode: 404, message: "Email can't be empty" });
        }

        const user: forUser[] = await selectUserByEmail(email);

        if (user.length !== 0) {
            if (user[0].password) {
                const isPasswordValid = await bcrypt.compare(password, user[0].password);
                if (!isPasswordValid) {
                    return next({ statusCode: 403, message: "Invalid password." });
                }
            }

            // Generate a JWT token for the user
            const token = await generateToken(user[0].userID);
            const userToReturn = user[0];
            userToReturn.token = token;
            delete userToReturn.password; // Remove password from response

            return res.status(200).json(userToReturn);
        } else {
            return next({ statusCode: 404, message: "User not found" });
        }
    } catch (error) {
        console.log("Error getting user:", error);
        return next({ statusCode: 500, message: "An error occurred while signing in" });
    }
};