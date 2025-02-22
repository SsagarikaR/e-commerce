import { Request, Response, NextFunction } from "express";
import {
  createNewCategory,
  deleteCatgeory,
  selectAllCatgeory,
  selectCatgeoryByID,
  selectCatgeoryByName,
  updateTheCatgeory,
} from "../respository/categories";


// Controller to create a new category
export const createCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryName, categoryThumbnail } = req.body;

  try {
    // Check if the category already exists
    const isCategoryExist = await selectCatgeoryByName(categoryName);
    if (isCategoryExist.length !== 0) {
      return next({ statusCode: 409, message: "This category already exists" });
    }

    // Create a new category
    const [result, metaData] = await createNewCategory(categoryName, categoryThumbnail);
    if (metaData !== 0) {
      return res.status(201).json({ message: "Successfully added a new category." });
    } else {
      return next({ statusCode: 400, message: "Error in adding a new category." });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time" });
  }
};




 
//  Controller to get categories (by name or all categories)
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  try {
    // If a name is provided, search for category by name
    if (name) {
      if (typeof name === "string") {
        const categoryWithThisName = await selectCatgeoryByName(name);
        if (categoryWithThisName.length === 0) {
          return next({ statusCode: 404, message: `No category with name ${name} found.` });
        } else {
          return res.status(200).json(categoryWithThisName);
        }
      }
    }

    // If no name, fetch all categories
    const allCategories = await selectAllCatgeory();
    if (allCategories.length === 0) {
      return next({ statusCode: 404, message: "No categories found." });
    } else {
      return res.status(200).json(allCategories);
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time!" });
  }
};







//  Controller to update an existing category
export const updateCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID, categoryName, categoryThumbnail } = req.body;

  try {
    const isCategoryExist = await selectCatgeoryByID(categoryID);
    if (isCategoryExist.length === 0) {
      return next({ statusCode: 404, message: "Category not found" });
    }

    const updateThumbnail = await updateTheCatgeory(categoryName, categoryThumbnail, categoryID);
    return res.status(200).json({ message: "Successfully updated the category." });

  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time." });
  }
};




//  Controller to delete an existing category
export const deleteCategories = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID } = req.body;

  try {
    const isCategoryExist = await selectCatgeoryByID(categoryID);
    if (isCategoryExist.length === 0) {
      return next({ statusCode: 404, message: "This category not found" });
    }

    await deleteCatgeory(categoryID);
    return res.status(200).json({ message: "Successfully deleted the category." });

  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time!" });
  }
};
