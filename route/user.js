const Router = require("express");
const { getCategory } = require("../controller/category");
const { threadValidation } = require("../validator/threadValidation");
const { upload } = require("../middleware/multer");
const {
  addThread,
  showAllThread,
  showOneThread,
  showOwnThread,
  showUserThread,
} = require("../controller/thread");
const router = Router();
//
//
//
router.get("/category", getCategory);
router.get("/threads", showAllThread);
router.get("thread/:threadId", showOneThread);
router.post("/thread", upload.single("image"), threadValidation, addThread);
router.get("/myThread", showOwnThread);
router.get("/userThread/:userId", showUserThread);

// router.
module.exports = router;
