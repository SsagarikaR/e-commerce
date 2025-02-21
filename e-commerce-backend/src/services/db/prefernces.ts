import { sequelize } from "../../config/databse";
import { QueryTypes } from "sequelize";

export const yourPrefernce=async(userID:number)=>{
    sequelize.query(`SELECT
                    pr.PreferenceID,
                    pr.userID
                    p.productID,
                    p.productName,
                    p.productThumbnail,
                    p.productPrice,
                    c.categoryID,
                    br.brandID,
                    br.brandThumbnail
                    FROM Preferences pr
                    JOIN Products p ON pr.productID = p.productID
                    JOIN Catgeories c on p.categoryID = c.categoryID
                    JOIN Brands br ON p.brandID = br.brandID
                    WHERE pr.userID=?
                    `,
                {
                    replacements:[userID],
                    type:QueryTypes.SELECT
                })
}

