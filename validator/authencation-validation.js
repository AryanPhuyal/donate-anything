const { body } = require("express-validator");
const { checkUserExists } = require("../utility/authencation");

emailValidation = body("email")
  .isEmail()
  .withMessage("Emails should be in someone@something.com");

emailValidationLogin = body("email")
  .isEmail()
  .withMessage("Emails should be in someone@something.com")
  .normalizeEmail();

passwordValidation = body("password")
  .isLength({
    min: 5,
    max: 15,
  })
  .withMessage("Password must be of length between 5 and 15");

firstNameValidation = body("firstName")
  .isString()
  .trim()
  .not()
  .isEmpty()
  .withMessage("Dont leave First Name field empty")
  .isString()
  .withMessage("FirstName Must Be String")
  .isLength({ min: 2, max: 10 })
  .withMessage("Name should between 2 and 10");

lastNameValidation = body("lastName")
  .isString()
  .trim()
  .not()
  .isEmpty()
  .withMessage("Dont leave Last Name Fiend Empty")
  .isString()
  .withMessage("First Name Must Be String")
  .isLength({ min: 2, max: 10 })
  .withMessage("Last Name should between 2 and 10");

roleValidation = body("role")
  .isString()
  .trim()
  .not()
  .isEmpty()
  .withMessage("Role is Required")
  .custom((role) => {
    console.log(role);
    if (
      role.toLowerCase() != "admin" &&
      role.toLowerCase() != "business" &&
      role.toLowerCase() != "user"
    ) {
      return Promise.reject("Role is not valid");
    }
  });

exports.signUpValidation = [
  emailValidation,
  passwordValidation,
  firstNameValidation,
  lastNameValidation,
  // roleValidation,
];

exports.loginValidation = [emailValidationLogin, passwordValidation];
