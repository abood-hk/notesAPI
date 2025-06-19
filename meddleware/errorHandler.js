import chalk from "chalk";
const errorHandler = (err, req, res, next) => {
  let message = err.message || "Something went wrong";
  let status = err.status || 400;
  console.error(chalk.redBright("error: " + message));
  res.status(status).json({ error: message });
};
export default errorHandler;
