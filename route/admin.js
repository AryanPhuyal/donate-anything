// admin routes

const Router = require("express").Router;
const router = Router();
// const {} = require("../controller/admin");
const { upload } = require("../middleware/multer");
const {
  getCategory,
  deleteCategory,
  createCategory,
  editCategory,
} = require("../controller/category");

// delete user
// any user
// admin route
// router.get("/delete-user/:userId");

// // reset password
// router.get("/reset-password/:userId");
router.get("/category", getCategory);
// });
router.post("/category", upload.single("profile"), createCategory);
module.exports = router;
