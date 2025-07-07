import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 10,
      trim: true,
    },
    password: {
      type: String,
      minlength: 7,
      maxlength: 15,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /[A-Z]/.test(v) && /[0-9]/.test(v);
        },
        message:
          "Password must contain at least one number and one uppercase letter",
      },
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
