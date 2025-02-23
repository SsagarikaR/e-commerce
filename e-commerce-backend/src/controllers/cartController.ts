import { Request, Response, NextFunction } from "express";
import {
  addCartItemService,
  getCartItemsService,
  deleteCartItemService,
  updateCartItemQuantityService,
} from "../services/db/carts";

// Controller to add an item to the user's cart
export const addCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const { productID, quantity } = req.body;
  const userID = req.body.user.identifire;

  try {
    const result = await addCartItemService(userID, productID, quantity);
    if (result.success) {
      return res.status(200).json({ message: result.message, cartItemID: result.cartItemID });
    } else {
      return next({ statusCode: 400, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "An error occurred while adding the item to the cart" });
  }
};




// Controller to get all items in the user's cart
export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;

  try {
    const result = await getCartItemsService(userID);
    return res.status(200).json(result.cartItems);
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "An error occurred while fetching the cart items" });
  }
};

// Controller to delete an item from the user's cart
export const deleteCartItem= async (req: Request, res: Response, next: NextFunction) => {
  const { cartItemID } = req.body;

  try {
    const result = await deleteCartItemService(cartItemID);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "An error occurred while deleting the cart item" });
  }
};

// Controller to update the quantity of an item in the user's cart
export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, cartItemID } = req.body;

  try {
    const result = await updateCartItemQuantityService(quantity, cartItemID);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return next({ statusCode: 404, message: result.message });
    }
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "An error occurred while updating the cart item quantity" });
  }
};
