import { sequelize } from "../../config/databse";
import { QueryTypes } from "sequelize";

export const selectProductWithAllMatch = async (
  productName: string,
  productDescription: string,
  productPrice: number,
  categoryID: number
) => {
  return await sequelize.query(
    "SELECT * FROM Products WHERE productName=? AND productDescription=?  AND productPrice=? AND categoryID=?",
    {
      replacements: [productName, productDescription, productPrice, categoryID],
      type: QueryTypes.SELECT,
    }
  );
};

export const updateProducts=async(productName:string,productDescription:string,productThumbnail:string,productPrice:number,categoryID:number,productID:number)=>{
    return await sequelize.query('UPDATE Products SET productName=? ,productDescription=? ,productThumbnail=? ,productPrice=? ,categoryID=? WHERE productID=?',{
        replacements:[productName,productDescription,productThumbnail,productPrice,categoryID,productID],
        type:QueryTypes.UPDATE
    })
}
export const deleteByProductID=async(productID:number)=>{
    return await sequelize.query('DELETE FROM Products WHERE productID=?',{
        replacements:[productID],
        type:QueryTypes.DELETE
    });
}

export const selectByProductID=async(productID:number)=>{
    return await sequelize.query('SELECT * FROM Products WHERE productID=?',
        {
            replacements:[productID],
            type:QueryTypes.SELECT
        }
    )
}

export const createNewProduct = async (
  productName: string,
  productDescription: string,
  productThumbnail: string,
  productPrice: number,
  categoryID: number
) => {
  return await sequelize.query(
    "INSERT INTO Products (productName,productDescription,productThumbnail,productPrice,categoryID) VALUES (?,?,?,?,?)",
    {
      replacements: [
        productName,
        productDescription,
        productThumbnail,
        productPrice,
        categoryID,
      ],
      type: QueryTypes.INSERT,
    }
  );
};

export const getProductWithCondition = async ({categoryID,name,id,price,}: 
    {categoryID?: string | number;name?: string;id?: string | number;price?: "low-to-high" | "high-to-low";}) => {
  let query = `
          SELECT *
          FROM Products p
          LEFT JOIN Categories c ON p.categoryID = c.categoryID
        `;
  let replacements = [];
  let conditions = [];

  if (categoryID) {
    conditions.push(`p.categoryID = ?`);
    replacements.push(categoryID);
  }

  if (name) {
    conditions.push(`p.productName LIKE ?`);
    replacements.push(`%${name}%`);
  }

  if (id) {
    conditions.push(`p.productID = ?`);
    replacements.push(id);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  if (price) {
    if (price === "low-to-high") {
      query += ` ORDER BY p.productPrice ASC`;
    } else if (price === "high-to-low") {
      query += ` ORDER BY p.productPrice DESC`;
    }
  }

  return await sequelize.query(query, {
    replacements: replacements,
    type: QueryTypes.SELECT,
  });
};
