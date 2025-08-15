// @ts-nocheck

import UserController from "../controller/user_controller";
import GroceryController from "../controller/grocery_controller";
import HistoryController from "../controller/history_controller";
import express from "express";
import upload from "../middleware/upload";
import StatisticController from "../controller/statistic_controller";
import StoreController from "../controller/store_controller";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);

router.get("/grocery/:storeId", GroceryController.getGroceries);
router.get("/grocery/details/:id", GroceryController.getGrocery);
router.post(
  "/grocery",
  upload.single("image"),
  GroceryController.createGrocery
);
router.put(
  "/grocery/:id",
  upload.single("image"),
  GroceryController.updateGrocery
);
router.delete("/grocery/:id", GroceryController.deleteGrocery);

router.get("/store/:userId", StoreController.getStores);
router.get("/store/details/:id", StoreController.getStore);
router.post("/store", StoreController.createStore);
router.put("/store/:id", StoreController.updateStore);
router.delete("/store/:id", StoreController.deleteStore);

router.get("/history/:userId", HistoryController.getHistory);
router.post("/history", HistoryController.createHistory);

router.get("/stats/:userId", StatisticController.getStatistics);

export default router;
