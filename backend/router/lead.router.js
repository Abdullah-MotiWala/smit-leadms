const { Router } = require("express");
const bodyParser = require("../lib/middlewares/bodyparse.middleware.js");
const router = Router();

router.get("/", (req, res) => {
  console.log("GET Lead");
  res.status(200).send("Get Lead");
});
router.get("/all", (req, res) => {
  console.log("GET All Lead");
  res.status(200).send("Get All Leads");
});

router.post("/", (req, res) => {
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
