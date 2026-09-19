const bodyParser = (req, res, next) => {
  let chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    console.log(chunks, "===chunks");
    const buffer = Buffer.concat(chunks);
    const jsonBody = JSON.parse(buffer.toString());
    // if(req.headers["content-type"] === "application/json"){
    // const jsonBody = JSON.parse(buffer.toString())
    // } else if(req.headers["content-type"] === "application/text"){
    //   const jsonBody = JSON.parse(buffer.toString())
    // }
    req.body = jsonBody;
    next();
  });
};

module.exports = bodyParser;
