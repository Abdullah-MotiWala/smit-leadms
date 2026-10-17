const { model, Schema } = require("mongoose");

const leadSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      min: 3,
      max: 50,
      required: true,
    },
    description: {
      type: String,
      min: 3,
      max: 500,
    },
    status: {
      type: String,
      enum: ["PENDING", "REPLIED", "REJECTED"],
      default: "PENDING",
    },
    createdBy: {
      type: String,
      required: true,
    },
    createdBy2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Lead = model("lead", leadSchema);
module.exports = Lead;
