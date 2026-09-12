const http = require("http");
console.log("abcdef");

const server = http.createServer((req, res) => {
  console.log(req.method);
  if (req.method === "PUT") {
    res.statusCode = 201;
    res.end("Walikum Salam");
  }
  if (req.method === "GET") {
    res.statusCode = 200;
    res.end("Walikum Salam");
  }
})

server.listen(5000);
