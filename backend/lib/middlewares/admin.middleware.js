const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const isAdmin = req.user.role === "ADMIN";
  if (!isAdmin) {
    return res.status(403).send("You're not allowed to do this");
  }

  next();
}

module.exports = adminMiddleware;
