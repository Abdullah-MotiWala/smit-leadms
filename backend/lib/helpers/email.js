const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(
  to,
  subject,
  text,
  html,
  from = "Abdullah Motiwala <aj5388587@gmail.com>",
) {
  const response = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return response
}

module.exports = sendMail;
