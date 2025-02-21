import { sequelize } from "../config/databse";
import { DataTypes } from "sequelize";
import { Produtcs } from "./product";
import { Users } from "./user";

export const Orders=sequelize.define("Orders",{
    orderID:{
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
    quantiy:{
        type:DataTypes.INTEGER,
        allowNull:false
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
    productPrice:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    platformFee:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:'10'
    },
    deliveryFee:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:'15'
    },
    totalPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    address:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('Pending','Success','Cancel'),
        allowNull:false,
        defaultValue:'Pending'
    }

},
{
    timestamps:false
})