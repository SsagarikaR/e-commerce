import { 
    selectReviewByProductAndUser, 
    addNewReview, 
    selectByReviewID, 
    selectReviewOfProduct, 
    deleteReview, 
    updateReview ,
    calculateAverageRating,updateProductRating
  } from "../../respository/reviews";
  import { sequelize } from "../../config/databse";
  
  // Service function to add a new review
 

export const addReviewService = async (userID: number, productID: number, rating: number, description: string) => {
  const t = await sequelize.transaction(); 

  try {
    // 1. Check if the user already reviewed the product
    const isAlreadyExist = await selectReviewByProductAndUser(userID, productID);
    if (isAlreadyExist.length > 0) {
      return { success: false, message: "You have already added a review for this product." };
    }

    // 2. Add the new review (inside transaction)
    await addNewReview(userID, productID, rating, description, t);

    // 3. Calculate the new average rating for the product
    const avgRating = await calculateAverageRating(productID, t);
    console.log(avgRating,"avg");

    // 4. Update product's rating with the new average (inside transaction)
    await updateProductRating(productID, avgRating, t);

    // Commit the transaction if everything went well
    await t.commit();

    return { success: true, message: "Thank you for adding a review!" };
  } catch (error) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    console.error("Error adding review:", error);
    throw new Error("An error occurred while adding the review.");
  }
};

  



  // Service function to get all reviews for a product
  export const getReviewsOfProductService = async (productID: number) => {
    try {
      const reviews = await selectReviewOfProduct(productID);
      if (reviews.length === 0) {
        return { success: false, message: "No reviews found." };
      }
      return { success: true, reviews };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw new Error("An error occurred while fetching reviews.");
    }
  };
  




  // Service function to update a review
  export const updateReviewService = async (userID: number, reviewID: number, rating: number, description: string) => {
    try {
      const reviewExist = await selectByReviewID(reviewID);
      if (reviewExist.length === 0) {
        return { success: false, message: "No review found for this review ID." };
      }
  
      await updateReview(userID, reviewID, rating, description);
      return { success: true, message: "Review updated successfully!" };
    } catch (error) {
      console.error("Error updating review:", error);
      throw new Error("An error occurred while updating the review.");
    }
  };
  



  // Service function to delete a review
  export const deleteReviewService = async (userID: number, reviewID: number) => {
    try {
      const reviewExist = await selectByReviewID(reviewID);
      if (reviewExist.length === 0) {
        return { success: false, message: "No review found for this review ID." };
      }
  
      await deleteReview(userID, reviewID);
      return { success: true, message: "Review deleted successfully!" };
    } catch (error) {
      console.error("Error deleting review:", error);
      throw new Error("An error occurred while deleting the review.");
    }
  };


