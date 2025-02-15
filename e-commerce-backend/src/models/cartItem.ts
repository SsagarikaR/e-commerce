import { DataTypes } from "sequelize";
import { sequelize } from "../db/databse";
import { Produtcs } from "./product";
import { Users } from "./user";

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
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
  
},
{
    timestamps:false
})

// console.log(CartItems===sequelize.model("CartItems"))