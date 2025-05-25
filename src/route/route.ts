// @ts-nocheck

import UserController from "../controller/user_controller";
import GroceryController from "../controller/grocery_controller";
import HistoryController from "../controller/history_controller";
import express from "express";
import upload from "../middleware/upload";
import StatisticController from "../controller/statistic_controller";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);

router.get("/grocery/:userId", GroceryController.getGroceries);
router.get("/grocery/:id", GroceryController.getGrocery);
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

router.get("/history/:userId", HistoryController.getHistory);
router.post("/history", HistoryController.createHistory);

router.get("/stats/:userId", StatisticController.getStatistics);

export default router;
