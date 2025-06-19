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
router.post("/notes", addNote);
router.delete("/notes/:id", removeNote);
router.put("/notes/:id", updateNote);
export default router;
