import { Request, Response } from "express";
import History from "../models/history";
import Grocery from "../models/grocery";

const HistoryController = {
  async getHistory(req: Request, res: Response) {
    try {
      const history = await History.findAll({
        where: { userId: req.params.userId },
        include: Grocery,
      });
      if (!history) {
        return res.status(404).json({
          status: 404,
          message: "History is empty",
        });
      }
      return res.status(200).json({
        status: 200,
        history: history,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  async createHistory(req: Request, res: Response) {
    try {
      await History.create(req.body);
      return res.status(201).json({
        status: 201,
        message: "History created successfully",
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

export default HistoryController;
