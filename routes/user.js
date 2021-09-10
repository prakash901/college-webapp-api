const express = require("express");
const userController = require("../controllers/user.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/login", userController.Login);
router.get("/", userController.index);
router.delete("/:id", checkAuthMiddleware.checkAuth, userController.destroy);
module.exports = router;
