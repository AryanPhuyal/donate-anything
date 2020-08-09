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

const { me, updateProfile } = require("../controller/user");
const router = Router();
//
//
//
router.get("/category", getCategory);
// logged in user
// details
// router.get("/me");
// user profile
//  following
// // router.get("/user/:userId");
// router.get("/me", me);
// router.put("/me", updateProfile);

router.get("/threads", showAllThread);
router.get("threads/:threadId", showOneThread);
router.post("/thread", upload.single("image"), threadValidation, addThread);
router.get("/myThread", showOwnThread);
router.get("/userThread/:userId", showUserThread);
// deactivate user
// router.get("/deactivate");

// router.
module.exports = router;
