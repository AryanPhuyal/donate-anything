const { body } = require("express-validator");

const nameValidator = body("name")
  .isEmpty()
  .withMessage("Name is required")
  .isLength({
    min: 2,
    max: 50,
  })
  .withMessage("Must be between 2 and 50");

const dateBroughtValidator = body(dateBrought);

const faultDescriptionValidator = body("faultDescription")
  .not()
  .isEmpty()
  .withMessage("Fault description should not be empty")
  .length({ max: 500, min: 10 })
  .withMessage("Fault description should be between 10 and 500");

const faultDescriptionValidator = body("description")
  .not()
  .isEmpty()
  .withMessage("Description should not be empty")
  .length({ max: 500, min: 10 })
  .withMessage("Description should be between 10 and 500");
