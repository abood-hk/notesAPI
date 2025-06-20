import express, { Router } from "express";
const router = express.Router();
import { getMainPg, getRequest } from "../controllers/mainController.js";
router.get("/", getMainPg);
router.get("/:folder/:filename.:type", getRequest);
export default router;
