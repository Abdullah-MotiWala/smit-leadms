const bcrypt = require("bcrypt");
const sendMail = require("../lib/helpers/email");
const { OnBoard } = require("../emailTemplates/auth.templates");
const jwt = require("jsonwebtoken");
const { OTP } = require("otplib");
const getMins = require("../lib/helpers/getMSinMin");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");

const createUserForSignup = async (body, res) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).send("Email Already Exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });
  await sendMail(email, OnBoard.subject, OnBoard.text);
  res.status(201).send("user created");
};

const getUserForLogin = async (body, res) => {
  const { password, email } = body;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send("Credentials not found");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) res.status(400).send("Credentials not found");

  const token = jwt.sign({ email, id: user.id }, process.env.SECRET_KEY);
  res.status(200).send({ token });
};

const sendEmailToForgotUser = async (body, res) => {
  const { email } = body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).send("User not exist");
  }

  const otp = new OTP();
  const secret = otp.generateSecret();
  const token = await otp.generate({ secret });

  await Otp.create({ token, secret, email });
  await sendMail(email, "OTP Code", `Please use this otp:${token}`);

  res.status(200).send("Email has been sent");
};

const checkIfOTPisValid = async (body, res) => {
  const { otp } = body;
  // confirmOTP

  const existingOTP = await Otp.findOne({ token: otp });
  if (!existingOTP) {
    return res.status(400).send("OTP record does not exist");
  }
  const isExpired = checkIfExpired(existingOTP.createdAt, getMins(5));
  if (isExpired) {
    return res.status(400).send("OTP has been expired");
  }

  await Otp.updateOne({ token: otp }, { $set: { confirmedAt: Date.now() } });

  res.status(200).send("OTP has been verified, please update the password");
};

const checkIfExpired = (creationTimeInMS, expiryDurationInMS) => {
  const currentTime = Date.now();

  return currentTime >= creationTimeInMS + expiryDurationInMS;
};

module.exports = {
  createUserForSignup,
  getUserForLogin,
  checkIfOTPisValid,
  sendEmailToForgotUser,
};
