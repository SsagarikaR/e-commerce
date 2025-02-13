import { Request,Response,NextFunction, Errback, ErrorRequestHandler } from "express";
export async function errorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
    console.error(err.stack);
    console.log("kandni sagarika")
    res.status(500).json({ error: 'Internal Server Error' });
  }