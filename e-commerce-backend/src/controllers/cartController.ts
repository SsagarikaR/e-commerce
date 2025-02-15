import { Request,Response } from "express";
import { sequelize } from "../db/databse";
import { QueryTypes } from "sequelize";

export const addCartItem = async (req: Request, res: Response) => {
    const {  productID, quantity } = req.body;
     const userID=req.body.user.identifire;
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
        'SELECT * FROM CartItems WHERE userID = ? AND productID = ?',
        {
          replacements: [userID, productID ],
          type: QueryTypes.SELECT,
        }
      );
  
      if (existingCartItem) {
        return res.status(403).json({ error: "Product is already in your cart" });
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
    const userID  = req.body.user.identifire;  

    try {
      const cartItems = await sequelize.query(`
        SELECT ci.cartItemID, ci.quantity, p.productID, p.productName, p.productDescription, p.productThumbnail, p.productPrice, c.categoryName,
        (SELECT SUM(ci2.quantity * p2.productPrice) 
        FROM CartItems ci2 
        JOIN Products p2 ON ci2.productID = p2.productID 
        WHERE ci2.userID = ?) AS totalPrice
        FROM CartItems ci
        JOIN Products p ON ci.productID = p.productID
        JOIN Categories c ON p.categoryID = c.categoryID
        WHERE ci.userID = ? 
      `, {
        replacements: [ userID,userID ],
        type: QueryTypes.SELECT,
      });
  
  
      return res.status(200).json(cartItems );
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ error: "Please try again after sometime!" });
    }
  };

  export const checkCart=async(req:Request,res:Response)=>{
    const Response=await sequelize.query(`SELECT *`)
  }

  export const deleteCartItem = async (req: Request, res: Response) => {
    const { cartItemID } = req.body;
  
    try {
      const cartItem = await sequelize.query(
        'SELECT * FROM CartItems WHERE cartItemID = ?',
        {
          replacements: [ cartItemID ],
          type: QueryTypes.SELECT,
        }
      );
  
      if (cartItem.length===0) {
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
    const { quantity,cartItemID } = req.body;
  
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
  