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
      await Grocery.create(req.body);
      return res.status(201).json({
        status: 201,
        message: "Grocery created successfully",
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
      await grocery.update(req.body);
      return res.status(200).json({
        status: 200,
        message: "Grocery updated successfully",
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
