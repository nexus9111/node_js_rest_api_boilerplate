const express = require("express");
const router = express.Router();

const securityUtils = require("../../utils/securityUtils");

const controller = require("../controllers/userController");

router.post("/login", controller.login);
router.post("/register", controller.register);

// you can use this to protect your route
router.get("/", securityUtils.authenticate, controller.profile);
router.delete("/", securityUtils.authenticate, controller.delete);

module.exports = router;