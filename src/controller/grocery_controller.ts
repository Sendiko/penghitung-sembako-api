import { Request, Response } from "express";
import Grocery from "../models/grocery";

const GroceryController = {
  async getGrocery(req: Request, res: Response) {
    try {
      const grocery = await Grocery.findByPk(req.params.id);
      if (!grocery) {
        return res.status(404).json({
          status: 404,
          message: "Grocery not found",
        });
      }
      return res.status(200).json({
        status: 200,
        grocery: grocery,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  async getGroceries(req: Request, res: Response) {
    try {
      const groceries = await Grocery.findAll({
        where: { userId: req.params.userId },
      });
      return res.status(200).json({
        status: 200,
        groceries: groceries,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  async createGrocery(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image file is required",
        });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/groceries/${req.file.filename}`;

      const grocery = await Grocery.create({
        userId: req.body.userId,
        name: req.body.name,
        unit: req.body.unit,
        price: req.body.price,
        imageUrl: imageUrl,
      });

      return res.status(201).json({
        status: 201,
        message: "Grocery created successfully",
        grocery: grocery,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async updateGrocery(req: Request, res: Response) {
    try {
      const grocery = await Grocery.findByPk(req.params.id);
      if (!grocery) {
        return res.status(404).json({
          status: 404,
          message: "Grocery not found",
        });
      }

      let imageUrl = grocery.imageUrl;
      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        imageUrl = `${baseUrl}/public/groceries/${req.file.filename}`;
      }

      const updated = await grocery.update({
        userId: req.body.userId ?? grocery.userId,
        name: req.body.name ?? grocery.name,
        unit: req.body.unit ?? grocery.unit,
        price: req.body.price ?? grocery.price,
        imageUrl,
      });

      return res.status(200).json({
        status: 200,
        message: "Grocery updated successfully",
        grocery: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  async deleteGrocery(req: Request, res: Response) {
    try {
      const grocery = await Grocery.findByPk(req.params.id);
      if (!grocery) {
        return res.status(404).json({
          status: 404,
          message: "Grocery not found",
        });
      }
      await grocery.destroy();
      return res.status(200).json({
        status: 200,
        message: "Grocery deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default GroceryController;
