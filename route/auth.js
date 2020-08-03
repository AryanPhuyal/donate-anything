const express = require("express");
const router = express.Router();

const {
  loginValidation,
  signUpValidation,
  signUpValidationBusiness,
} = require("../validator/authencation-validation");
const { me, updateProfile, changePassword } = require("../controller/user");
const { login, signup } = require("../controller/auth");

router.post("/login", loginValidation, login);
router.post("/signup", signUpValidation, signup);
router.post("/signup-business", signUpValidationBusiness, signup);
router.get("/api/me", me);
router.put("/api/me", signUpValidation, updateProfile);
router.put("/api/change-password", changePassword);

module.exports = router;
