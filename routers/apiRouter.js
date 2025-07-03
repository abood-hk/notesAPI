import express from "express";
import {
  getNotes,
  getNote,
  getDefault,
  addNote,
  removeNote,
  updateNote,
} from "../controllers/apiController.js";
import {
  validateId,
  validateTitle,
  validateContent,
  validateIdOp,
} from "../meddleware/validation.js";
const router = express.Router();
router.get("/", validateIdOp, getDefault);
router.get("/:filename", validateIdOp, getNotes);
router.get("/:filename/:id", validateId, getNote);
router.post("/:filename", [validateContent, validateTitle], addNote);
router.delete("/:filename/:id", validateId, removeNote);
router.put(
  "/:filename/:id",
  [validateId, validateContent, validateTitle],
  updateNote
);
export default router;
