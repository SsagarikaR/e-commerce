import { DataTypes } from "sequelize";
import {sequelize} from "../config/databse";
import {Orders} from "./order";

export const OrderItems = sequelize.define("OrderItems", {
    orderItemID: 
    { 
      type: DataTypes.INET, 
      allowNull:false,
      autoIncrement:true,
      primaryKey: true 
    },
    orderId:
    {
        type: DataTypes.INTEGER, 
        references: 
        { 
            model: Orders,
            key: "orderID" 
        } 
    },
    productId:
    { 
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    quantity:
    { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    price: 
    { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
},
{
    timestamps:false
});

