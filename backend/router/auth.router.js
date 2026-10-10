const { Router } = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
} = require("../validations/auth.validation");
const validationMiddleware = require("../lib/middlewares/validation.middlerware");
const {
  signup,
  login,
  forgotPassword,
  verifyOTP,
} = require("../controller/auth.controller");

const router = Router();

router.post("/sign-up", validationMiddleware(signupSchema), signup);
router.post("/login", validationMiddleware(signinSchema), login);
router.post(
  "/forgot-password",
  validationMiddleware(forgotPasswordSchema),
  forgotPassword,
);
router.post("/verify-otp",validationMiddleware(verifyOTPSchema),verifyOTP)
router.put("/update-password",validationMiddleware(verifyOTPSchema),verifyOTP)

module.exports = { authRouter: router };
