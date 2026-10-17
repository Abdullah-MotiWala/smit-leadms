const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 6,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["MANAGER", "ADMIN"],
      default: "MANAGER",
    },
  },
  {
    timestamps: true,
  },
);

const User = model("user", userSchema);
User.index({ email, role });
module.exports = User;
