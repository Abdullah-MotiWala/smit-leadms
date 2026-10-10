require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.DB_URI);
  console.log("Database Connected");
}

module.exports = {
  connectDB,
};
