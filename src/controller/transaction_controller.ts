import { Request, Response } from "express";
import Transaction from "../models/transaction";
import Grocery from "../models/grocery";
import Stock from "../models/stock";
import { withTransaction } from "../middleware/db_transaction";

const TransactionController = {
  async getTransacions(req: Request, res: Response) {
    try {

      if (!req.params.storeId) {
        return res.status(400).json({
          status: 400,
          message: "Store ID required."
        })
      }
      const transactions = await Transaction.findAll({
        where: {
          storeId: req.params.storeId
        },
        include: [
          {
            model: Grocery,
            as: "Grocery",
            attributes: ["id", "name"]
          }
        ]
      });

      return res.status(200).json({
        status: 200,
        transactions: transactions
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
        error: error.message
      })
    }
  },
  async getTransaction(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Transaction ID required."
        });
      }

      const transaction = await Transaction.findOne({
        where: {
          id: req.params.id
        }
      });

      if (!transaction) {
        return res.status(404).json({
          status: 404,
          message: "Transaction not found."
        });
      }

      return res.status(200).json({
        status: 200,
        transaction: transaction
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
        error: error.message
      })
    }
  },
  async createTransaction(req: Request, res: Response) {
    try {
      const result = withTransaction(async(t) => {
        const transaction = await Transaction.create(req.body, {transaction: t})
        
        const stock = await Stock.findOne({
          where: {
            groceryId: req.body.groceryId
          }
        });
        await stock?.update({
          quantity: stock.quantity - req.body.amount
        }, {transaction: t});

        return transaction;
      })

      return res.status(201).json({
        status: 201,
        message: "Transaction successfully created.",
        transaction: result
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
        error: error.message
      })
    }
  },
  async updateTransaction(req: Request, res: Response) {
    try {

      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Transaction ID required."
        });
      }

      const transaction = await Transaction.findByPk(req.params.id);

      if (!transaction) {
        return res.status(404).json({
          status: 404,
          message: "Transaction not found"
        })
      }

      
      if (req.body.amount) {
        const stock = await Stock.findOne({
          where: {
            groceryId: req.body.groceryId
          }
        })

        await withTransaction(async(t) => {          
          const newQty = stock?.quantity ?? 0 + transaction.amount - req.body.amount;;
  
          await stock?.update({
            quantity: newQty
          }, {transaction: t})
          await transaction.update(req.body)
        });
        

        return transaction
      }
      

      return res.status(200).json({
        status: 200,
        message: "Transactions successfully updated.",
        transaction: transaction
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
        error: error.message
      })
    }
  },
  async deleteTransaction(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Transaction ID required."
        })
      }

      const transaction = await Transaction.findByPk(req.params.id);

      if (!transaction) {
        return res.status(404).json({
          status: 404,
          message: "Transaction not found."
        })
      }

      const stock = await Stock.findOne({
        where: {
          groceryId: transaction.groceryId
        }
      })
      
      withTransaction(async(t) => {
        await stock?.update({
          quantity: stock.quantity + transaction.amount
        }, {transaction: t})
        await transaction.destroy({transaction: t});
      })

      return res.status(200).json({
        status: 200,
        message: "Transaction successfully deleted."
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error.",
        error: error.message
      })
    }
  }
}

export default TransactionController;