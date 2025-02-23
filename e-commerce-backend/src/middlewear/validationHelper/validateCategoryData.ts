import { Request, Response, NextFunction } from "express";

// Middleware to validate category data for creating a new category
export const validateCreateCategoryData = (req: Request, res: Response, next: NextFunction) => {
  const { categoryName, categoryThumbnail } = req.body;

  if (!categoryName || !categoryThumbnail) {
    return next({ statusCode: 400, message: "Category name and thumbnail are required" });
  }

  if (categoryName.length < 3 || categoryName.length > 50) {
    return next({ statusCode: 400, message: "Category name must be between 3 and 50 characters" });
  }

  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  if (!urlRegex.test(categoryThumbnail)) {
    return next({ statusCode: 400, message: "Category thumbnail must be a valid URL" });
  }

  next();
};




// Middleware to validate category data for updating an existing category
export const validateUpdateCategoryData = (req: Request, res: Response, next: NextFunction) => {
    const { categoryID, categoryName, categoryThumbnail } = req.body;

    if (!categoryID) {
      return next({ statusCode: 400, message: "Category ID is required" });
    }
  
    if (!categoryName && !categoryThumbnail) {
      return next({ statusCode: 400, message: "At least one field (categoryName or categoryThumbnail) must be provided" });
    }
  
    if (categoryName && (categoryName.length < 3 || categoryName.length > 50)) {
      return next({ statusCode: 400, message: "Category name must be between 3 and 50 characters" });
    }
  
    if (categoryThumbnail && !/^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i.test(categoryThumbnail)) {
      return next({ statusCode: 400, message: "Category thumbnail must be a valid URL" });
    }
  
    next();
  };


