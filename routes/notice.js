const express = require("express");
const noticeController = require("../controllers/notice.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, noticeController.save);
router.get("/", noticeController.index);
router.get("/:id", noticeController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, noticeController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, noticeController.destroy);

module.exports = router;
