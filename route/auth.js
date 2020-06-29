const express = require("express");
const router = express.Router();

const {
  loginValidation,
  signUpValidation,
} = require("../validator/authencation-validation");
const { login, signup } = require("../controller/auth");

router.post("/login", loginValidation, login);
router.post("/signup", signUpValidation, signup);
module.exports = router;
