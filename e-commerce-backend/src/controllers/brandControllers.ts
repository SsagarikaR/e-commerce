import { NextFunction, Request, Response } from "express";
import {
  findBrandByName,
  createNewBrand,
  findAllBrand,
  updateTheBrand,
  selectBrandByID,
  deleteBrandByID,
} from "../services/db/brands";

/** 
 * Controller for creating a new brand
 */
export const createBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandName, brandThumbnail } = req.body;

  try {
    // Check if all required fields are provided
    if (!brandName || !brandThumbnail) {
      return next({ statusCode: 409, message: "Please enter required fields." });
    }

    // Check if the brand already exists
    const isBrandExist = await findBrandByName(brandName);
    if (isBrandExist.length !== 0) {
      return next({ statusCode: 404, message: "This brand already exists." });
    }

    // Create the new brand
    const [result, metaData] = await createNewBrand(brandName, brandThumbnail);
    if (metaData !== 0) {
      return res.status(202).json({ message: "Successfully added a new brand." });
    } else {
      return next({ statusCode: 409, message: "Error in adding a new brand." });
    }
  } catch (error) {
    // Log the error and pass it to the global error handler
    console.log(error, "Error while creating brand");
    return next({ statusCode: 500, message: "An error occurred while creating brand." });
  }
};




/**
 *  Controller to fetch brands, either by name or all brands
 * */
export const getBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  try {
    // If name is provided, search for a brand with that name
    if (name) {
      if (typeof name === "string") {
        const brandWithThisName = await findBrandByName(name);
        if (brandWithThisName.length === 0) {
          return next({ statusCode: 404, message: `No brand with name ${name} found.` });
        } else {
          return res.status(200).json(brandWithThisName);
        }
      }
    }

    // If no name is provided, return all brands
    const allBrands = await findAllBrand();
    if (allBrands.length === 0) {
      return next({ statusCode: 404, message: "No brands found." });
    } else {
      return res.status(200).json(allBrands);
    }
  } catch (error) {
    // Log the error and pass it to the global error handler
    console.log(error, "Error while fetching brands");
    return next({ statusCode: 500, message: "An error occurred while fetching brands." });
  }
};




/** 
 *  Controller for updating a brand's details
 * */
export const updateBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandID, brandName, brandThumbnail } = req.body;

  try {
    // Ensure all required fields are provided
    if (!brandName || !brandThumbnail || !brandID) {
      return next({ statusCode: 409, message: "Please enter required fields." });
    }

    // Update the brand information
    const updateThumbnail = await updateTheBrand(brandID, brandName, brandThumbnail);
    console.log(updateThumbnail);

    // Return success response
    return res.status(200).json({ message: "Successfully updated the brand." });
  } catch (error) {
    // Log the error and pass it to the global error handler
    console.log(error, "Error while updating brand");
    return next({ statusCode: 500, message: "An error occurred while updating the brand." });
  }
};



/**  
 * Controller for deleting a brand by its ID
 * */
export const deleteBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandID } = req.body;

  try {
    // Check if the brand exists
    const isBrandExist = await selectBrandByID(brandID);
    if (isBrandExist.length === 0) {
      return next({ statusCode: 404, message: "This brand not found." });
    }

    // Delete the brand by its ID
    await deleteBrandByID(brandID);
    return res.status(200).json({ message: "Successfully deleted the brand." });
  } catch (error) {
    // Log the error and pass it to the global error handler
    console.log(error, "Error while deleting brand");
    return next({ statusCode: 500, message: "An error occurred while deleting the brand." });
  }
};
