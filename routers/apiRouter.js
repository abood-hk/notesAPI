import express from "express";
import {
  getNotes,
  getNote,
  getDefault,
  addNote,
  removeNote,
  updateNote,
  getStatus,
} from "../controllers/apiController.js";
import {
  validateId,
  validateTitle,
  validateContent,
  validateIdOp,
  validateLimit,
} from "../meddleware/validation.js";
const router = express.Router();
router.get("/status", getStatus);
router.get("/", validateIdOp, getDefault);
router.get("/notes", [validateIdOp, validateLimit], getNotes);
router.get("/notes/:id", [validateId, validateLimit], getNote);
router.post("/notes", [validateContent, validateTitle], addNote);
router.delete("/notes/:id", validateId, removeNote);
router.put(
  "/notes/:id",
  [validateId, validateContent, validateTitle],
  updateNote
);
export default router;
