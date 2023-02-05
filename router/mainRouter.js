const express = require('express');
const router = express.Router();

const controller = require('../controllers/exampleController');

router.get('/main', controller.mainController);
router.get('/error', controller.mainErrorController);
router.get('/database', controller.dataBaseController);

module.exports = router;