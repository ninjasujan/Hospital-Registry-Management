const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Coldn't authenticate headers.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "hospital-key");
  } catch (err) {
    const error = new Error("Token validation failed.");
    error.statusCode = 401;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Couldn't authorize the token.");
    error.statusCode = 401;
    throw error;
  }
  next();
};
