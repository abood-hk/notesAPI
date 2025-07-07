import express from "express";
import apiRouter from "./routers/apiRouter.js";
import logger from "./meddleware/logger.js";
import errorHandler from "./meddleware/errorHandler.js";
import mainRouter from "./routers/mainRouter.js";
import path from "path";
import url from "url";
import helmet from "helmet";
import cors from "cors";
import "./dataBase/connect.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", apiRouter);
app.use("/public", mainRouter);
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(errorHandler);
app.listen(port, () => console.log("Server is running"));
