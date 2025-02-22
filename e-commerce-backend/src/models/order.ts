import { DataTypes } from "sequelize";
import { sequelize } from "../config/databse";

export const Orders = sequelize.define("Orders", {
  ordersID:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    autoIncrement: true,
    primaryKey: true 
  },
  userId:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  totalAmount:
   { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  status: 
  { 
    type: DataTypes.ENUM('Pending', 'Success', 'Cancel'),
    defaultValue: 'Pending' 
  },
  address: 
  { 
    type: DataTypes.STRING, // Store the address as a string
    allowNull: false
  }
},{
    timestamps:false
});
