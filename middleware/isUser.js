const User = require("../model/User");
exports.isUser = (req, res, next) => {
  if (req.user.role === "user" || req.user.role == "admin") {
    next();
  } else {
    res.status(300).json({ err: "Unauthorize" });
  }
};
