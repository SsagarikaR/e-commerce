import { DataTypes } from "sequelize";
import { sequelize } from "../config/databse";

export const Users=sequelize.define("Users",{
    UserID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    contactNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
        
    }
},
{
    timestamps:false
}
)
console.log(Users==sequelize.model("Users"));