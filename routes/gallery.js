const express = require("express");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

router.post("/", blogController.save);
router.get("/", blogController.index);
router.get("/:id", blogController.show);
router.patch("/:id", blogController.update);
router.delete("/:id", blogController.destroy);

module.exports = router;
