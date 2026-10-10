const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
  {
    token: {
      type: Number,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["LOGIN", "FORGOT_PASSWORD", "UPDATE_PASSWORD"],
      default: "LOGIN",
    },
    confirmedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Otp = model("otp", otpSchema);
module.exports = Otp;

