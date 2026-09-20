const { Router } = require("express");
const validationMiddleware = require("../lib/middlewares/validation.middlerware.js");
const { craeteLeadSchema } = require("../validations/lead.validation.js");
const jwt = require("jsonwebtoken");
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

router.post("/", validationMiddleware(craeteLeadSchema), (req, res) => {
  const token = req.headers.authorization;
  let decodedData;
  try {
    decodedData = jwt.verify(token, "S3CR3T");
  } catch (error){
    console.log(error)
    res.status(401).send("Please login again");
    return;
  }
  console.log(decodedData);
  // business logic here
  console.log("Create Lead");
  console.log(req.body, "===body");
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
