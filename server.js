import express from "express";
import apiRouter from "./routers/apiRouter.js";
import logger from "./meddleware/logger.js";
import errorHandler from "./meddleware/errorHandler.js";
import mainRouter from "./routers/mainRouter.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use("/public", mainRouter);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to the notes api" });
});
app.use(errorHandler);
app.listen(port, () => console.log("Server is running"));
