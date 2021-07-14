const express = require("express");
const messageController = require("../controllers/message.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", messageController.save);
router.get("/", messageController.index);
router.delete("/:id", checkAuthMiddleware.checkAuth, messageController.destroy);

module.exports = router;
