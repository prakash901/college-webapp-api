const express = require("express");
const galleryController = require("../controllers/gallery.controller");
const imageUploader = require("../helpers/image-uploader");
const router = express.Router();

router.post(
  "/upload",
  imageUploader.upload.single("image"),

  galleryController.save
);

router.get("/", galleryController.index);
router.get("/:id", galleryController.show);

router.patch("/:id", galleryController.update);
router.delete("/:id", galleryController.destroy);

module.exports = router;
