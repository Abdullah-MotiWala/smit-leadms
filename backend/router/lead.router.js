const { Router } = require("express");
const validationMiddleware = require("../lib/middlewares/validation.middlerware.js");
const { craeteLeadSchema } = require("../validations/lead.validation.js");
const authMiddleware = require("../lib/middlewares/auth.middleware.js");
const {
  create,
  getAllUserLeads,
  getOneLead,
  getAllUserLeadsAdmin,
} = require("../controller/lead.controller.js");
const adminMiddleware = require("../lib/middlewares/admin.middleware.js");
const router = Router();

router.get("/all", authMiddleware, getAllUserLeads);
router.get(
  "/all-admin",
  authMiddleware,
  adminMiddleware,
  getAllUserLeadsAdmin,
);

router.post(
  "/",
  authMiddleware,
  validationMiddleware(craeteLeadSchema),
  create,
);

router.put("/", (req, res) => {
  console.log("GET Lead");
  res.status(201).send("Get Lead");
});
router.delete("/", (req, res) => {
  console.log("GET Lead");
  res.status(201).send("Get Lead");
});

router.get("/:id", authMiddleware, getOneLead);
module.exports = { leadRouter: router };
