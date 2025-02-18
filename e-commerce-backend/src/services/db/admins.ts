import { sequelize } from "../../config/databse";
import { Sequelize,QueryTypes } from "sequelize";

export const createNewAdmin=async(userID:number)=>{
    return await sequelize.query("INSERT INTO Admins  (userID) VALUES (?)",
        {
            replacements:[userID],
            type:QueryTypes.INSERT
        }
    )
}

export const selectAdmin=async(userID:number)=>{
    return await sequelize.query("SELECT * FROM Admins Where userID=?",{
        replacements:[userID],
        type:QueryTypes.SELECT
    })
}