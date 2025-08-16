import { Request, Response } from "express";
import Grocery from "../models/grocery";
import Stock from "../models/stock";

const GroceryController = {
  async getGrocery(req: Request, res: Response) {
    try {
      const grocery = await Grocery.findByPk(req.params.id, {
        include: [{
          model: Stock,
          as: 'stock',
          attributes: ['quantity']
        }]
      });
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
        where: { storeId: req.params.storeId },
        include: [{
          model: Stock,
          as: 'stock',
          attributes: ['quantity']
        }]
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
        storeId: req.body.storeId,
        name: req.body.name,
        unit: req.body.unit,
        price: req.body.price,
        imageUrl: imageUrl,
      });

      await Stock.create({
        storeId: req.body.storeId,
        groceryId: grocery.id,
        quantity: req.body.quantity || 0 
      });

      const groceryWithStock = await Grocery.findByPk(grocery.id, {
        include: [{
          model: Stock,
          as: 'stock',
          attributes: ['quantity']
        }]
      });

      return res.status(201).json({
        status: 201,
        message: "Grocery created successfully",
        grocery: groceryWithStock,
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
        storeId: req.body.userId ?? grocery.storeId,
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

  async updateStock(req: Request, res: Response) {
    try {
      const { quantity } = req.body;
      
      if (quantity === undefined || quantity < 0) {
        return res.status(400).json({
          status: 400,
          message: "Valid quantity is required",
        });
      }

      const stock = await Stock.findOne({
        where: { groceryId: req.params.id }
      });

      if (!stock) {
        return res.status(404).json({
          status: 404,
          message: "Stock not found for this grocery",
        });
      }

      await stock.update({ quantity });

      const groceryWithStock = await Grocery.findByPk(req.params.id, {
        include: [{
          model: Stock,
          as: 'stock',
          attributes: ['quantity']
        }]
      });

      return res.status(200).json({
        status: 200,
        message: "Stock updated successfully",
        grocery: groceryWithStock,
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
