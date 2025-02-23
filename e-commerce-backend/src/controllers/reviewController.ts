import { Request, Response, NextFunction } from "express";
import { 
  addReviewService, 
  getReviewsOfProductService, 
  updateReviewService, 
  deleteReviewService 
} from "../services/db/reviews";

// Controller to add a new review
export const addReview = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;
  const { productID, rating, description } = req.body;

  if (!userID) {
    return next({ statusCode: 400, message: "User not authenticated or missing." });
  }

  if (!productID || !(rating >= 0 && rating <= 5) || !description) {
    return next({ statusCode: 409, message: "Please enter all the required fields." });
  }

  try {
    const { success, message } = await addReviewService(userID, productID, rating, description);
    if (!success) {
      return next({ statusCode: 403, message });
    }

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Error adding review:", error);
    return next({ statusCode: 500, message: "An error occurred while adding the review." });
  }
};






// Controller to get reviews for a product
export const getReviewsOfProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next({ statusCode: 409, message: "Please enter the product id to fetch reviews for this product." });
  }

  try {
    const { success, reviews, message } = await getReviewsOfProductService(Number(id));
    if (!success) {
      return next({ statusCode: 404, message });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    return next({ statusCode: 500, message: "An error occurred while fetching reviews." });
  }
};






// Controller to update a review
export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;
  const { reviewID, rating, description } = req.body;

  if (!reviewID || !rating || !description) {
    return next({ statusCode: 400, message: "Please enter review ID, rating, and description." });
  }

  try {
    const { success, message } = await updateReviewService(userID, reviewID, rating, description);
    if (!success) {
      return next({ statusCode: 404, message });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error updating review:", error);
    return next({ statusCode: 500, message: "An error occurred while updating the review." });
  }
};







// Controller to delete a review
export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;
  const { reviewID } = req.body;

  if (!reviewID) {
    return next({ statusCode: 400, message: "Please provide a review ID to delete." });
  }

  try {
    const { success, message } = await deleteReviewService(userID, reviewID);
    if (!success) {
      return next({ statusCode: 404, message });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting review:", error);
    return next({ statusCode: 500, message: "An error occurred while deleting the review." });
  }
};
