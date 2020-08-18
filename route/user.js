const Router = require("express");
const { getCategory } = require("../controller/category");
const { threadValidation } = require("../validator/threadValidation");
// const { upload } = require("../middleware/multer");

const {
  addThread,
  showAllThread,
  showOneThread,
  showOwnThread,
  showUserThread,
  deleteThread,
  updateThread,
} = require("../controller/thread");

const { followUser, profilePic } = require("../controller/user");
const router = Router();
//
router.get("/category", getCategory);
router.get("/threads", showAllThread);
router.get("thread/:threadId", showOneThread);
router.post("/thread", threadValidation, addThread);
router.get("/myThread", showOwnThread);
router.delete("/thread/:threadId", deleteThread);
router.get("/userThread/:userId", showUserThread);
router.put("/thread/:id", updateThread);
router.get("/follow-user/:userId", followUser);
router.put("/profile-pic", profilePic);
// deactivate user
// router.get("/deactivate");

// router.
module.exports = router;
