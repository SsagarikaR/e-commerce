import { DataTypes } from "sequelize";
import { sequelize } from "../config/databse";
import { Produtcs } from "./product";

export const Reviews=sequelize.define("Reviews",{
    reviewID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Produtcs,
            key:"productID"
        }
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    timestamps:false
});