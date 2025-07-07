import mongoose from "mongoose";
import users from "./users.js";
const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  content: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 250,
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: "true",
    default: "686ac72aba2402d4d8867e60",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
// notesSchema.post("find", function (docs) {
//   docs.forEach((doc) => {
//     const localTime = doc.createdAt.toLocaleString("en-SA", {
//       timeZone: "Asia/Riyadh",
//     });
//     console.log(`${doc.title} was created at (locally): ${localTime}`);
//   });
// });
//
// notesSchema.post("find", async function (docs) {
//   for (const doc of docs) {
//     await doc.populate("user");
//     console.log(doc);
//   }
// });
notesSchema.pre(["updateMany", "updateOne"], function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});
notesSchema.virtual("shortCreatedTime").get(function () {
  const localTime = this.createdAt.toLocaleString("en-SA", {
    timeZone: "Asia/Riyadh",
  });
  return localTime;
});
notesSchema.virtual("shortUpdatedTime").get(function () {
  const localTime = this.updatedAt.toLocaleString("en-SA", {
    timeZone: "Asia/Riyadh",
  });
  return localTime;
});
const noteModel = mongoose.model("notes", notesSchema);
export default noteModel;
