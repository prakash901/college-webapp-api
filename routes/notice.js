const express = require("express");
const noticeController = require("../controllers/notice.controller");

const router = express.Router();

router.post("/", noticeController.save);
router.get("/", noticeController.index);
router.get("/:id", noticeController.show);
router.patch("/:id", noticeController.update);
router.delete("/:id", noticeController.destroy);

module.exports = router;
