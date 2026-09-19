const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = Router();

const users = [];

router.post("/sign-up", async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ ...req.body, password: hashedPassword });
  res.status(201).send("user created");
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) res.status(400).send("Credentials not found");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) res.status(400).send("Credentials not found");

  const token = jwt.sign({ email }, "S3CR3T");
  res.status(200).send({ token });
});

module.exports = { authRouter: router };
