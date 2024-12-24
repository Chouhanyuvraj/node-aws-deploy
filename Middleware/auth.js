const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    console.log("herecome", req);
    const token = req.header("Authorization");
    console.log("tokennnn", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const parsedToken = token.split(" ")[1];
    console.log("parsedToken", parsedToken);
    const decoded = jwt.verify(parsedToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

const adminAuth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const parsedToken = token.split(" ")[1];
      const decoded = jwt.verify(parsedToken, process.env.SECRET_KEY);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Only Super Admin can Access this" });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized", error: err.message });
    }
  };
};

module.exports = { auth, adminAuth };
