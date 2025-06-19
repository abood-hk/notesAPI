import chalk from "chalk";
import path from "path";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDirname = path.dirname(__dirname);
const colors = {
  GET: chalk.green,
  POST: chalk.yellow,
  PUT: chalk.blue,
  DELETE: chalk.red,
};
const logger = (req, res, next) => {
  let method = req.method;
  let filepath = path.join(mainDirname, req.url);
  if (!req.url.includes(".well-known") && !req.url.includes("favicon")) {
    console.log(colors[method](method + "  " + filepath));
    next();
    return;
  }
};
export default logger;
