const express = require("express");
const router = express.Router();

const securityUtils = require("../utils/securityUtils");

const controller = require("../controllers/exampleController");

router.get("/main", controller.mainController);
router.get("/error", controller.mainErrorController);
router.get("/database", controller.dataBaseController);

// you can use this to protect your route
router.get("/protected", securityUtils.authorize(["admin"]), controller.mainController);

module.exports = router;