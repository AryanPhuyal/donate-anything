const User = require("../model/User");
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.status(300).json({ err: "Unauthorize" });
  }
};
