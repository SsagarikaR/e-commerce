import { sequelize } from "../config/databse";
import { DataTypes } from "sequelize";
import { Categories } from "./categories";

export const Produtcs=sequelize.define("Products",{
    productID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    thumbnail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
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