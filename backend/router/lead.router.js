const { Router, json } = require("express")
const router = Router()

router.get("/", (req, res) => {
  console.log("GET Lead")
  res.status(200).send("Get Lead")
})
router.get("/all", (req, res) => {
  console.log("GET All Lead")
  res.status(200).send("Get All Leads")
})

router.post("/", (req, res, next) => {
  let chunks = []
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const jsonBody = JSON.parse(buffer.toString())
    // if(req.headers["content-type"] === "application/json"){
    // const jsonBody = JSON.parse(buffer.toString())
    // } else if(req.headers["content-type"] === "application/text"){
    //   const jsonBody = JSON.parse(buffer.toString())
    // }
    req.body = jsonBody
    next()
  })

},
  (req, res) => {
    // business logic here
    console.log("Create Lead")
    console.log(req.body, "===body")
    res.status(201).send("Create Lead")
  })
router.put("/", (req, res) => {
  console.log("GET Lead")
  res.status(201).send("Get Lead")
})
router.delete("/", (req, res) => {
  console.log("GET Lead")
  res.status(201).send("Get Lead")
})

module.exports = { leadRouter: router }