import { sequelize } from "../config/databse";
import { DataTypes } from "sequelize";
import { Categories } from "./Categories";

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
    ProdutThumbnail:{
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