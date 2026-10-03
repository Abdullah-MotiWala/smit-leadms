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
const { createUserForSignup } = require("../services/auth.service");

const router = Router();

router.post("/sign-up", 
  validationMiddleware(signupSchema), 
  async (req, res) =>createUserForSignup(req.body, res),

  {
    data:[]|null,
    message:"",
    success: boolean
  }
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
