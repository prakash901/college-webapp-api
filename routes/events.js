const express = require("express");
const eventController = require("../controllers/event.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const imageUploader = require("../helpers/image-uploader");

const router = express.Router();

router.post(
  "/",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  eventController.save
);
router.get("/", eventController.index);
router.get("/:id", eventController.show);
router.patch(
  "/:id",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  eventController.update
);
router.delete("/:id", checkAuthMiddleware.checkAuth, eventController.destroy);

module.exports = router;
