import express from "express";
import {
  getNotes,
  getNote,
  getDefault,
  addNote,
  removeNote,
  updateNote,
} from "../controllers/apiController.js";
const router = express.Router();
router.get("/", getDefault);
router.get("/:filename", getNotes);
router.get("/:filename/:id", getNote);
router.post("/:filename", addNote);
router.delete("/:filename/:id", removeNote);
router.put("/:filename/:id", updateNote);
export default router;
