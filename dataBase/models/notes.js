import mongoose from "mongoose";
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
