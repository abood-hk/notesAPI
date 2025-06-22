import path from "path";
import url from "url";
import fs from "fs/promises";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDirname = path.dirname(__dirname);

export const getMainPg = (req, res) => {
  res.status(200).sendFile(path.join(mainDirname, "public", "index.html"));
};

export const getRequest = (req, res) => {
  res.status(200).sendFile(path.join(mainDirname, "public", req.url));
};
