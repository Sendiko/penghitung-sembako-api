// @ts-nocheck

import UserController from "../controller/user_controller";
import GroceryController from "../controller/grocery_controller";
import HistoryController from "../controller/history_controller";
import express from "express";

const router = express.Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);

router.get("/grocery/:userId", GroceryController.getGroceries);
router.get("/grocery/:id", GroceryController.getGrocery);
router.post("/grocery", GroceryController.createGrocery);
router.put("/grocery/:id", GroceryController.updateGrocery);
router.delete("/grocery/:id", GroceryController.deleteGrocery);

router.get("/history/:userId", HistoryController.getHistory);
router.post("/history", HistoryController.createHistory);

export default router;
