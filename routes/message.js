const express = require("express");
const messageController = require("../controllers/message.controller");

const router = express.Router();

router.post("/", messageController.save);
router.get("/", messageController.index);
router.delete("/:id", messageController.destroy);

module.exports = router;
