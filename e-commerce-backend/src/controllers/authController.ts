import { generateToken } from "../middlewear/authentication";
import { Request,Response ,NextFunction} from "express";
import { createUserService,getUserService } from "../services/db/users";


//Creates a new user.
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, contactNo, password } = req.body;

    try {
        const result = await createUserService(name, email, contactNo, password);

        if (!result.success) {
            return next({ statusCode: 403, message: result.message });
        }

        const token = await generateToken(Number(result.result));
        return res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error creating user" });
    }
};



// Controller to get a user by email and password
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const result = await getUserService(email, password);

        if (!result?.success) {
            return next({ statusCode: 404, message: result?.message });
        }

        if(result.user){
            const user = result.user;
            const token = await generateToken(user.userID);
            user.token = token;
    
            return res.status(200).json(user);
        }
       
    } catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: "Error retrieving user" });
    }
};