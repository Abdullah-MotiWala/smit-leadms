const { getDB } = require("../lib/helpers/db");
const bcrypt = require("bcrypt");
const sendMail = require("../lib/helpers/email");
const { OnBoard } = require("../emailTemplates/auth.templates");

const createUserForSignup = async (body, res) => {
  const { email, password } = body;
  const user = await getDB().collection("user").findOne({ email });
  if (user) {
    return res.status(409).send("Email Already Exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await getDB()
    .collection("user")
    .insertOne({ email, password: hashedPassword });
  await sendMail(email, OnBoard.subject, OnBoard.text);
  res.status(201).send("user created");
};

module.exports = { createUserForSignup };
