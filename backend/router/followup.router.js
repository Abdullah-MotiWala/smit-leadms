const {Router} = require("express")
const router = Router()

router.get("/followup",(req,res)=>{
  console.log("GET followup")
  res.status(200).send("Get followup")
})
router.post("/followup",(req,res)=>{
  console.log("GET followup")
  res.status(201).send("Get followup")
})
router.put("/followup",(req,res)=>{
  console.log("GET followup")
  res.status(201).send("Get followup")
})
router.delete("/followup",(req,res)=>{
  console.log("GET followup")
  res.status(201).send("Get followup")
})

module.exports = {followupRouter:router}