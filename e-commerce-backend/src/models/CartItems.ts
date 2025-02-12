import { DataTypes } from "sequelize";
import { sequelize } from "../config/databse";
import { Produtcs } from "./Products";
import { Users } from "./Users";

export const CartItems=sequelize.define("CartItems",{
    cartItemID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Produtcs,
            key:"productID"
        },
        onDelete:'CASCADE'
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Users,
            key:"userID"
        },
        onDelete:'CASCADE'
    }
  
},
{
    timestamps:false
})

console.log(CartItems===sequelize.model("CartItems"))