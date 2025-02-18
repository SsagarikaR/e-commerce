import { Request, Response, NextFunction } from "express";
import { selectByProductID } from "../services/db/products";
import {
  updateQuantityIfAlreadyExist,
  addNewCartItem,
  getCartByUserID,
  selectFromCartItemCartID,
  deleteFromCart,
  selectFromCartByUserANDProduct,
  updateCartItemsQuantity,
} from "../services/db/carts";

/** 
 * Controller to add an item to the user's cart
 * */
export const addCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const { productID, quantity } = req.body;
  const userID = req.body.user.identifire;

  try {
    // Check if product exists in the database
    const [product] = await selectByProductID(productID);
    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    const [existingCartItem] = await selectFromCartByUserANDProduct(userID, productID);
    if (existingCartItem) {
      // If the item is already in the cart, update its quantity
      await updateQuantityIfAlreadyExist(userID, productID);
      return res.status(200).json({ message: "Product quantity updated in cart" });
    }

    // Add new product to the cart
    const [newCartItem] = await addNewCartItem(userID, productID, quantity);
    return res.status(201).json({
      message: "Product added to cart",
      cartItemID: newCartItem,
    });
  } catch (error) {
    // Catch any errors and forward them to the global error handler
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};



/** 
 * Controller to fetch all items in the user's cart
 * */
export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.identifire;

  try {
    // Retrieve all cart items for the user
    const cartItems = await getCartByUserID(userID);
    return res.status(200).json(cartItems);
  } catch (error) {
    // Catch any errors and forward them to the global error handler
    console.log(error, "error");
    return next({ statusCode: 500, message: "Please try again after sometime!" });
  }
};




/** 
 *  Controller to delete an item from the user's cart
 * */
export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const { cartItemID } = req.body;

  try {
    // Check if the cart item exists in the database
    const cartItem = await selectFromCartItemCartID(cartItemID);
    if (cartItem.length === 0) {
      return next({ statusCode: 404, message: "Cart item not found" });
    }

    // Delete the cart item
    await deleteFromCart(cartItemID);
    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    // Catch any errors and forward them to the global error handler
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};




/** 
 *  Controller to update the quantity of an item in the user's cart
 * */
export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, cartItemID } = req.body;
  console.log(req.body);

  try {
    // Check if the cart item exists
    const [cartItem] = await selectFromCartItemCartID(cartItemID);
    if (!cartItem) {
      return next({ statusCode: 404, message: "Cart item not found" });
    }

    // Update the quantity of the cart item
    await updateCartItemsQuantity(quantity, cartItemID);
    return res.status(200).json({
      message: "Cart item quantity updated successfully",
    });
  } catch (error) {
    // Catch any errors and forward them to the global error handler
    console.error(error);
    return next({ statusCode: 500, message: "Server error, please try again" });
  }
};
