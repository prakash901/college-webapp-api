const express = require("express");
const eventController = require("../controllers/event.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, eventController.save);
router.get("/", eventController.index);
router.get("/:id", eventController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, eventController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, eventController.destroy);

module.exports = router;
