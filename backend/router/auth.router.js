const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { signupSchema, signinSchema } = require("../validations/auth.validation");
const validationMiddleware = require("../lib/middlewares/validation.middlerware");

const router = Router();

const users = [];

router.post(
  "/sign-up",
  validationMiddleware(signupSchema),
  async (req, res) => {
    const { password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send("user created");
  },
);

router.post(
  "/login",
  validationMiddleware(signinSchema),
  async (req, res) => {
    const { password, email } = req.body;
    const user = users.find((user) => user.email === email);
    console.log(user,"===user")
    if (!user) res.status(400).send("Credentials not found");

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) res.status(400).send("Credentials not found");

    const token = jwt.sign({ email }, "S3CR3T");
    res.status(200).send({ token });
  },
);

module.exports = { authRouter: router };
