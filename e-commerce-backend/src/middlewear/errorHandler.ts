import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Fallback to 500 Internal Server Error if statusCode is not provided
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong. Please try again later.';

  // Log error details for debugging
  // console.error(`Error: ${message}`, err);

  // Send response to client
  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandler;

