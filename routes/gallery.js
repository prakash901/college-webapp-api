const express = require("express");
const galleryController = require("../controllers/gallery.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const imageUploader = require("../helpers/image-uploader");
const router = express.Router();

router.post(
  "/upload",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  galleryController.save
);

router.get("/", galleryController.index);
router.get("/:id", galleryController.show);

router.patch(
  "/:id",
  checkAuthMiddleware.checkAuth,
  imageUploader.upload.single("image"),
  galleryController.update
);
router.delete("/:id", checkAuthMiddleware.checkAuth, galleryController.destroy);

module.exports = router;
