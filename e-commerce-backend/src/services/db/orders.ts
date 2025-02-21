import { sequelize } from "../../config/databse";
import {QueryTypes} from "sequelize";

export const createOrder=async(userID:number,productID:number,productPrice:number,address:string,quantiy:number)=>{
    return await sequelize.query(`INSERT INTO Orders (productID,userID,productPrice,totalPrice,address,quantity) VALUES
        (?,?,?,sum(platformFee,deliveryFee,productPrice),?,?) `,{
            replacements:[productID,userID,productPrice,address,quantiy],
            type:QueryTypes.INSERT
        });
}