// @ts-nocheck

import UserController from "../controller/user_controller";
import GroceryController from "../controller/grocery_controller";
import express from "express";
import StatisticController from "../controller/statistic_controller";
import StoreController from "../controller/store_controller";
import TransactionController from "../controller/transaction_controller";
import UploadController from "../controller/upload_controller";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);

router.get("/grocery/:storeId", GroceryController.getGroceries);
router.get("/grocery/details/:id", GroceryController.getGrocery);
router.post("/grocery", GroceryController.createGrocery);
router.put("/grocery/:id", GroceryController.updateGrocery);
router.delete("/grocery/:id", GroceryController.deleteGrocery);
router.put("/grocery/:id/stock", GroceryController.updateStock);

router.get("/store/:userId", StoreController.getStores);
router.get("/store/details/:id", StoreController.getStore);
router.post("/store", StoreController.createStore);
router.put("/store/:id", StoreController.updateStore);
router.delete("/store/:id", StoreController.deleteStore);

router.get("/transaction/:storeId", TransactionController.getTransacions);
router.get("/transaction/details/:id", TransactionController.getTransaction);
router.post("/transaction", TransactionController.createTransaction);
router.put("/transaction/:id", TransactionController.updateTransaction);
router.delete("/transaction/:id", TransactionController.deleteTransaction);

router.get("/stats/:userId", StatisticController.getStatistics);
router.post("/upload/presigned-url", UploadController.generatePresignedUploadUrl);

export default router;
