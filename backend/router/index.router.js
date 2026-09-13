const { Router } = require("express")
const {leadRouter} = require("./lead.router")
const {followupRouter} = require("./followup.router")
const router = Router()


router.use("/lead", leadRouter)
router.use("/followup", followupRouter)

module.exports = router