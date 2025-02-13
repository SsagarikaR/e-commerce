import { Request,Response } from "express";
import { sequelize } from "../config/databse";
import { QueryTypes } from "sequelize";

export const addCartItem = async (req: Request, res: Response) => {
    const {  productID, quantity } = req.body;
     const userID=req.body.user.id;
    try {
      const [product] = await sequelize.query(
        'SELECT * FROM Products WHERE productID = :productID',
        {
          replacements: { productID },
          type: QueryTypes.SELECT,
        }
      );
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const [existingCartItem] = await sequelize.query(
        'SELECT * FROM CartItems WHERE userID = :userID AND productID = :productID',
        {
          replacements: { userID, productID },
          type: QueryTypes.SELECT,
        }
      );
  
      if (existingCartItem) {
        return res.status(400).json({ error: "Product is already in your cart" });
      }
  
      const [newCartItem] = await sequelize.query(
        'INSERT INTO CartItems (userID, productID, quantity) VALUES (:userID, :productID, :quantity)',
        {
          replacements: { userID, productID, quantity: quantity || 1 },
          type: QueryTypes.INSERT,
        }
      );
  
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
    const { userID } = req.params;  

    try {
      const cartItems = await sequelize.query(`
        SELECT ci.cartItemID, ci.quantity, p.productID, p.name, p.description, p.thumbnail, p.price, c.categoryName,
               (ci.quantity * p.price) AS totalPrice
        FROM CartItems ci
        JOIN Products p ON ci.productID = p.productID
        JOIN Categories c ON p.categoryID = c.categoryID
        WHERE ci.userID = :userID
      `, {
        replacements: { userID: userID },
        type: QueryTypes.SELECT,
      });
  
      if (cartItems.length === 0) {
        return res.status(404).json({ message: "No cart items found for this user." });
      }
  
      return res.status(200).json({ cartItems });
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ error: "Please try again after sometime!" });
    }
  };


  export const deleteCartItem = async (req: Request, res: Response) => {
    const { cartItemID } = req.params;
  
    try {
      const [cartItem] = await sequelize.query(
        'SELECT * FROM CartItems WHERE cartItemID = :cartItemID',
        {
          replacements: { cartItemID },
          type: QueryTypes.SELECT,
        }
      );
  
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
  
      await sequelize.query(
        'DELETE FROM CartItems WHERE cartItemID = :cartItemID',
        {
          replacements: { cartItemID },
          type: QueryTypes.DELETE,
        }
      );
  
      return res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error, please try again" });
    }
  };


  export const updateCartItemQuantity = async (req: Request, res: Response) => {
    const { cartItemID } = req.params; 
    const { quantity } = req.body;
  
    try {
      const [cartItem] = await sequelize.query(
        'SELECT * FROM CartItems WHERE cartItemID = :cartItemID',
        {
          replacements: { cartItemID },
          type: QueryTypes.SELECT,
        }
      );
  
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
  
      await sequelize.query(
        'UPDATE CartItems SET quantity = :quantity WHERE cartItemID = :cartItemID',
        {
          replacements: { quantity, cartItemID },
          type: QueryTypes.UPDATE,
        }
      );
  
      return res.status(200).json({
        message: "Cart item quantity updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error, please try again" });
    }
  };
  