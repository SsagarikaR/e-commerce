import { Request, Response, NextFunction } from "express";
import {
  addProductToWishListService,
  getWishListByUserService,
  getWishListItemByIDService,
  deleteFromWishListService,
} from "../services/db/wishLists";

// Controller to add a product to the wishlist
export const addToWishList = async (req: Request, res: Response, next: NextFunction) => {
  const { productID } = req.body;
  const userID = req.body.user.identifire;

  try {
    const result = await addProductToWishListService(userID, productID);
    if (!result.success) {
      return next({ statusCode: 403, message: result.message });
    }

    return res.status(201).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};





// Controller to get all products in the wishlist
export const getWishListItems = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;

  try {
    const result = await getWishListByUserService(userID);
    if (!result.success) {
      return next({ statusCode: 404, message: result.message });
    }
    return res.status(200).json(result.wishlist);
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};





// Controller to get a specific product in the product by ID
export const getWishListItemById = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;
  const { id } = req.params;

  try {
    const result = await getWishListItemByIDService(userID, Number(id));
    console.log(result,"Result bro")
    if (!result.success) {
      return next({ statusCode: 404, message: result.message });
    }
    return res.status(200).json(result.wishlistItem);
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};





// Controller to delete an item from the wishlist
export const deleteWishListItem = async (req: Request, res: Response, next: NextFunction) => {
  const { wishListID } = req.body;

  try {
    const result = await deleteFromWishListService(wishListID);
    if (!result.success) {
      return next({ statusCode: 404, message: result.message });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};
