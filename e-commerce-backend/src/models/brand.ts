import { sequelize } from "../db/databse";
import { DataTypes } from "sequelize";

export const brands=sequelize.define("brands",{
    brandtID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    brandName:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    timestamps:false
})

// console.log(Produtcs===sequelize.model("Products"));