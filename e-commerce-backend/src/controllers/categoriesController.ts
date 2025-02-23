import { Request, Response, NextFunction } from "express";
import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/db/categories";

// Controller to create a new category
export const createCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryName, categoryThumbnail } = req.body;

  try {
    if(!categoryName || !categoryThumbnail){
      return res.status(409).json({message:"Please enter all the required fields"});
    }
    // Call service to create a new category
    const result = await createCategoryService(categoryName, categoryThumbnail);
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return next({ statusCode: 409, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time" });
  }
};






// Controller to get categories (by name or all categories)
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  try {
    // Call service to fetch categories
    const result = await getCategoriesService(name? String(name) : undefined);
    if (result.success) {
      return res.status(200).json(result.categories);
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time!" });
  }
};







// Controller to update an existing category
export const updateCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID, categoryName, categoryThumbnail } = req.body;

  try {
    // Call service to update the category
    const result = await updateCategoryService(categoryID, categoryName, categoryThumbnail);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time." });
  }
};





// Controller to delete an existing category
export const deleteCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID } = req.body;

  try {
    // Call service to delete the category
    const result = await deleteCategoryService(categoryID);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time!" });
  }
};
