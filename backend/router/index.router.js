const { Router } = require("express");
const { leadRouter } = require("./lead.router");
const { followupRouter } = require("./followup.router");
const { authRouter } = require("./auth.router");
const router = Router();

router.use("/lead", leadRouter);
router.use("/followup", followupRouter);
router.use("/auth", authRouter);

module.exports = router;
