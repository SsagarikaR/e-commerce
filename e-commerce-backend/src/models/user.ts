import { DataTypes } from "sequelize";
import { sequelize } from "../db/databse";

export const Users=sequelize.define("Users",{
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contactNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
        
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps:false
}
)
// console.log(Users==sequelize.model("Users"));