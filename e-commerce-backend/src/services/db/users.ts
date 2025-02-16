import { forUser } from "interface/interface";
import { sequelize } from "../../config/databse";
import { QueryTypes } from "sequelize";
import { isRegularExpressionLiteral } from "typescript";

export const selectUserByID=async(id:number):Promise<forUser[]>=>{
    return await sequelize.query('SELECT * FROM Users WHERE userID=?',
        {
            replacements:[id],
            type:QueryTypes.SELECT
        }
    );
}
export const selectUserByName=async(name:string)=>{
    return await sequelize.query(`SELECT * FROM Users WHERE name=? `,
        {
            replacements:[name],
            type:QueryTypes.SELECT
        }
    );
}

export const selectUserByEmail = async(email:string)=>{
    return await sequelize.query(`SELECT * FROM Users WHERE email=?`,
        {
            replacements:[email],
            type:QueryTypes.SELECT
        }
    );
}

export const createNewUser=async(name:string,email:string,contactNo:string,role:string,hashedPassword:string)=>{
    return await sequelize.query(`INSERT INTO Users (name,email,contactNo,role,password) VALUES
                (?,?,?,?,?)`,{
                    replacements:[name,email,contactNo,role,hashedPassword],
                    type:QueryTypes.INSERT
                })
}

export const selectUserByNameANDContact=async(name:string,contactNo:string):Promise<forUser[]>=>{
    return await sequelize.query(`SELECT * FROM Users WHERE name=? AND  contactNo=?  `,
                {
                    replacements:[name,contactNo],
                    type:QueryTypes.SELECT
                }
            );
}

export const deleteUserByID=async(id:number)=>{
    return await sequelize.query('DELETE FROM Users WHERE userID=?',
        {
            replacements:[id],
            type:QueryTypes.DELETE
        }
    )
}

export const updateUsersPassword=async (hashedPassword:string)=>{
    return await sequelize.query('UPDATE Users SET password=?',
        {
            replacements:[hashedPassword],
            type:QueryTypes.UPDATE
        }
    )
}