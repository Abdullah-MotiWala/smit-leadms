const express = require("express")
const app = express()
const router = require("./router/index.router.js")
const bodyParser = require('body-parser')


// app.use(bodyParser.json())
app.use("/api",router)

app.get("/", (req, res) => {
  res.send("Hello World")
})



app.listen(5000, () => {
  console.log("app started")
})