import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import * as path from "path";

const router = express.Router();
import {
  addItem,
  getItems,
  getItemsById,
} from "../controllers/itemController.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.route("/").get(getItems);
router.route("/:id").get(getItemsById);
// router.route("/").post(addItem);
router.route("/").post(protect, upload.single("image"), addItem);

export default router;
