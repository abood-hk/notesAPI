import mongoose from "mongoose";
const monogodb = process.env.Mongo_db;
mongoose
  .connect(monogodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("monogodb connection error " + err.message));
