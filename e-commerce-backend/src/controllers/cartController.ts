import { Request, Response } from "express";
import { sequelize } from "../config/databse";
import { QueryTypes } from "sequelize";
import { selectByProductID } from "../services/db/products";
import { updateQuantityIfAlreadyExist,addNewCartItem, getCartByUserID, selectFromCartItemCartID, deleteFromCart,selectFromCartByUserANDProduct ,updateCartItemsQuantity} from "../services/db/carts";

export const addCartItem = async (req: Request, res: Response) => {
  const { productID, quantity } = req.body;
  const userID = req.body.user.identifire;
  try {
    const [product] = await selectByProductID(productID);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [existingCartItem] = await selectFromCartByUserANDProduct(userID, productID);
    if (existingCartItem) {
      await updateQuantityIfAlreadyExist(userID, productID );

      return res
        .status(200)
        .json({ message: "Product quantity updated in cart" });
    }

    const [newCartItem] = await addNewCartItem(userID,productID,quantity);

    return res.status(201).json({
      message: "Product added to cart",
      cartItemID: newCartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again" });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const userID = req.body.user.identifire;

  try {
    const cartItems = await getCartByUserID(userID);

    return res.status(200).json(cartItems);
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: "Please try again after sometime!" });
  }
};


export const deleteCartItem = async (req: Request, res: Response) => {
  const { cartItemID } = req.body;

  try {
    const cartItem = await selectFromCartItemCartID(cartItemID);
    if (cartItem.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await deleteFromCart(cartItemID)

    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again" });
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  const {quantity, cartItemID } = req.body;
  console.log(req.body);
  try {
    const [cartItem] = await selectFromCartItemCartID(cartItemID)
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await updateCartItemsQuantity(quantity,cartItemID);

    return res.status(200).json({
      message: "Cart item quantity updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error, please try again" });
  }
};
