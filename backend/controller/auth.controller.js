const {
  createUserForSignup,
  getUserForLogin,
  sendEmailToForgotUser,
  checkIfOTPisValid,
} = require("../services/auth.service");

const signup = async (req, res) => createUserForSignup(req.body, res);
const login = async (req, res) => {
  getUserForLogin(req.body, res);
};

const forgotPassword = async (req, res) => {
  sendEmailToForgotUser(req.body, res);
};

const verifyOTP = (req, res) => {
  checkIfOTPisValid(req.body, res);
};

module.exports = { signup, login, forgotPassword, verifyOTP };
