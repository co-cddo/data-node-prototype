const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

const requireRole =
  (roles = []) =>
  (req, res, next) => {
    if (!roles.includes(req.user["user-role"])) {
      return res.status(403).json({ error: "Insufficient role" });
    }
    next();
  };

module.exports = { verifyToken, requireRole };
