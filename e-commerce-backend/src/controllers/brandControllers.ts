import { Request, Response, NextFunction } from "express";
import {
  createBrandService,
  getBrandsService,
  updateBrandService,
  deleteBrandService,
} from "../services/db/brands";



// Controller to create a new brand
export const createBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandName, brandThumbnail } = req.body;

  try {
    if (!brandName || !brandThumbnail) {
      return res.status(409).json({ message: "Please enter all the required fields" });
    }
    
    // Call service to create a new brand
    const result = await createBrandService(brandName, brandThumbnail);
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





// Controller to get brands (by name or all brands)
export const getBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  try {
    const result = await getBrandsService(name ? String(name) : undefined);
    if (result.success) {
      return res.status(200).json(result.brands);
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Please try again after some time!" });
  }
};





// Controller to update an existing brand
export const updateBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandID, brandName, brandThumbnail } = req.body;

  try {
    const result = await updateBrandService(brandID, brandName, brandThumbnail);
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





// Controller to delete an existing brand
export const deleteBrands = async (req: Request, res: Response, next: NextFunction) => {
  const { brandID } = req.body;

  try {
    const result = await deleteBrandService(brandID);
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
