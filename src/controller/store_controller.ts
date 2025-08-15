import { Request, Response } from "express";
import Store from "../models/store";

const StoreController = {
  async getStores(req: Request, res: Response) {
    try {

      if (!req.params.userId) {
        return res.status(400).json({
          status: 400,
          message: "User ID is required",
        });
      }

      const store = await Store.findAll({
        where: {
          userId: req.params.userId,
        },
      });

      return res.status(200).json({
        status: 200,
        store: store,
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async getStore(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Store ID is required",
        });
      };

      const stores = await Store.findOne({
        where: {
          userId: req.params.id,
        },
      });

      return res.status(200).json({
        status: 200,
        stores: stores,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async createStore(req: Request, res: Response) {
    try {
      const { userId, name, address, phone, email } = req.body;

      const store = await Store.create({
        userId,
        name,
        address,
        phone,
        email,
      });

      return res.status(201).json({
        status: 201,
        message: "Store created successfully",
        store: store,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async updateStore(req: Request, res: Response) {
    try {

      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Store ID is required",
        });
      }

      const store = await Store.findByPk(req.params.id);
      if (!store) {
        return res.status(404).json({
          status: 404,
          message: "Store not found",
        });
      }

      const { name, address, phone, email } = req.body;
      const updated = await store.update({
        name,
        address,
        phone,
        email,
      });

      return res.status(200).json({
        status: 200,
        message: "Store updated successfully",
        store: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  async deleteStore(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Store ID is required",
        });
      }

      const store = await Store.findByPk(req.params.id);
      if (!store) {
        return res.status(404).json({
          status: 404,
          message: "Store not found",
        });
      }

      await store.destroy();

      return res.status(200).json({
        status: 200,
        message: "Store deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default StoreController;