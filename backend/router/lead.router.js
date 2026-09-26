const { Router } = require("express");
const validationMiddleware = require("../lib/middlewares/validation.middlerware.js");
const { craeteLeadSchema } = require("../validations/lead.validation.js");
const authMiddleware = require("../lib/middlewares/auth.middleware.js");
const router = Router();

const leads = [];

router.get("/", (req, res) => {
  console.log("GET Lead");
  res.status(200).send("Get Lead");
});
router.get("/all", (req, res) => {
  console.log("GET All Lead");
  res.status(200).send("Get All Leads");
});

router.post("/", authMiddleware, validationMiddleware(craeteLeadSchema), (req, res) => {
  const data = { ...req.body, userId: req.user.id };
  res.status(201).send("Create Lead");
});
router.put("/", (req, res) => {
  console.log("GET Lead");
  res.status(201).send("Get Lead");
});
router.delete("/", (req, res) => {
  console.log("GET Lead");
  res.status(201).send("Get Lead");
});

module.exports = { leadRouter: router };
