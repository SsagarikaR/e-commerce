import { Router,Request,Response } from "express";
import { checkToken, isAdmin } from "../config/authorization";

const router=Router();

export default router;