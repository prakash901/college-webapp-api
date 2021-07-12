const express = require("express");
const blogController = require("../controllers/blog.controller");
const checkAuthMiddleware = require("../middleware/check-auth");
const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, blogController.save);
router.get("/", blogController.index);
router.get("/:id", blogController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, blogController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, blogController.destroy);

module.exports = router;
