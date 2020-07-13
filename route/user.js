const Router = require("express");
const { getCategory } = require("../controller/category");
const {} = require("../controller/thread");
const router = Router();
router.get("/category", getCategory);
// router.post("/thread");
// router.
module.exports = router;
