const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  let decodedData;
  try {
    decodedData = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decodedData;
  } catch (error) {
    console.log(error);
    res.status(401).send("Please login again");
    return;
  }

  next();
}

module.exports = authMiddleware;
