import express from "express";
const router = express.Router();
import {
  addItem,
  getItems,
  getItemsById,
} from "../controllers/itemController.js";

router.route("/").get(getItems);
router.route("/:id").get(getItemsById);
router.route("/").post(addItem);

export default router;
