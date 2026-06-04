import { Request, Response } from "express";
import Grocery from "../models/grocery";
import Store from "../models/store";
import Transaction from "../models/transaction";

const StatisticController = {
  async getStatistics(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const groceryCount = await Grocery.count({
        include: [
          {
            model: Store,
            where: { userId: userId },
            attributes: [],
          },
        ],
      });
      
      const totalSales = await Transaction.sum("totalPrice", {
        include: [
          {
            model: Store,
            where: { userId: userId },
            attributes: [],
          },
        ],
      } as any);

      return res.status(200).json({
        status: 200,
        message: "Grocery count retrieved successfully",
        statistics: {
          groceryCount: groceryCount,
          totalSales: totalSales || 0,
        },
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

export default StatisticController;
