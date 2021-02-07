const JWT = require("jsonwebtoken");
/**
 * Authorize the user for backend APIs. Returns 400 if authentication fails.
 */
const authorize = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Not authorized to proceed!");

  try {
    const secret_key = process.env.SECRET_KEY;
    const payload = JWT.verify(token, secret_key);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Authentication failed. Invalid token!");
  }
};

module.exports = authorize;
