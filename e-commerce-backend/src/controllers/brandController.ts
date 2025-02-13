import { Request, Response } from "express";
import { sequelize } from "../db/databse";
import { QueryTypes } from "sequelize";

export const createBrand = async (req: Request, res: Response) => {
  const { brandName } = req.body;

  try {
    const [existingBrand]: any = await sequelize.query(
      `SELECT * FROM brands WHERE brandName = ?`,
      {
        replacements: [brandName],
        type:QueryTypes.SELECT
      }
    );

    if (existingBrand) {
      return res.status(400).json({ error: "Brand already exists" });
    }

    const [result, metadata] = await sequelize.query(
      `INSERT INTO brands (brandName) VALUES (?)`,
      {
        replacements: [brandName],
        type: QueryTypes.INSERT
      }
    );

    if (metadata) {
      return res.status(201).json({ message: "Brand created successfully" });
    }

    return res.status(400).json({ error: "Failed to create brand" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while creating the brand" });
  }
};


export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const [brands]: any = await sequelize.query(
      `SELECT * FROM brands`
    );

    if (brands.length === 0) {
      return res.status(404).json({ message: "No brands found" });
    }

    return res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching brands" });
  }
};


export const getBrandById = async (req: Request, res: Response) => {
  const { brandID } = req.params;

  try {
    const [brand]: any = await sequelize.query(
      `SELECT * FROM brands WHERE brandtID = ?`,
      {
        replacements: [brandID],
        type:QueryTypes.SELECT
      }
    );

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching the brand" });
  }
};


export const updateBrand = async (req: Request, res: Response) => {
  const { brandID } = req.params;
  const { brandName } = req.body;

  try {
    const existingBrand: any = await sequelize.query(
      `SELECT * FROM brands WHERE brandtID = ?`,
      {
        replacements: [brandID],
        type: QueryTypes.SELECT
      }
    );

    if (existingBrand.length===0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const [updateResult, updateMetadata] = await sequelize.query(
      `UPDATE brands SET brandName = ? WHERE brandtID = ?`,
      {
        replacements: [brandName, brandID],
        type: QueryTypes.UPDATE
      }
    );

    if (updateMetadata) {
      return res.status(200).json({ message: "Brand updated successfully" });
    }

    return res.status(400).json({ error: "Failed to update brand" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while updating the brand" });
  }
};


export const deleteBrand = async (req: Request, res: Response) => {
  const { brandID } = req.params;

  try {
    const [existingBrand]: any = await sequelize.query(
      `SELECT * FROM brands WHERE brandtID = ?`,
      {
        replacements: [brandID],
        type:QueryTypes.SELECT
      }
    );

    if (!existingBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const deleted = await sequelize.query(
      `DELETE FROM brands WHERE brandtID = ?`,
      {
        replacements: [brandID],
        type: QueryTypes.DELETE
      }
    );
      return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while deleting the brand" });
  }
};
