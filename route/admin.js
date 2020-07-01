// admin routes

const router = require("express").Router();
const {} = require("../controller/admin");
// delete user
// any user
// admin route
router.get("/delete-user/:userId");

// reset password
router.get("/reset-password/:userId");
