import { sequelize } from "../db/databse";
import { DataTypes } from "sequelize";
import { Categories } from "./category";

export const Produtcs=sequelize.define("Products",{
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productDescription:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    ProductThumbnail:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    productPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    categoryID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Categories,
            key:"categoryID"
        },
        onDelete:'CASCADE'
    }
},
{
    timestamps:false
})

// console.log(Produtcs===sequelize.model("Products"));