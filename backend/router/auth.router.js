const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  signupSchema,
  signinSchema,
} = require("../validations/auth.validation");
const validationMiddleware = require("../lib/middlewares/validation.middlerware");
const { db, getDB } = require("../lib/helpers/db");
const sendMail = require("../lib/helpers/email");
const { OnBoard } = require("../emailTemplates/auth.templates");

const router = Router();

router.post(
  "/sign-up",
  validationMiddleware(signupSchema),
  async (req, res) => {
    const { password, email } = req.body;
    const user = await getDB().collection("user").findOne({ email });
    if (user) {
      res.status(409).send("Email Already Exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await getDB()
      .collection("user")
      .insertOne({ email, password: hashedPassword });
    await sendMail(email, OnBoard.subject, OnBoard.text);
    res.status(201).send("user created");
  },
);

router.post("/login", validationMiddleware(signinSchema), async (req, res) => {
  const { password, email } = req.body;
  const user = await getDB().collection("user").findOne({ email });
  if (!user) res.status(400).send("Credentials not found");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) res.status(400).send("Credentials not found");

  const token = jwt.sign({ email, id: user.id }, process.env.SECRET_KEY);
  res.status(200).send({ token });
});

module.exports = { authRouter: router };
