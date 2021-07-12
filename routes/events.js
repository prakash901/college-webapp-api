const express = require("express");
const eventController = require("../controllers/event.controller");

const router = express.Router();

router.post("/", eventController.save);
router.get("/", eventController.index);
router.get("/:id", eventController.show);
router.patch("/:id", eventController.update);
router.delete("/:id", eventController.destroy);

module.exports = router;
