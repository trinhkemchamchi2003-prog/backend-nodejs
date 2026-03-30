const express = require('express');
const router = express.Router();
const imageControllers = require('../../controllers/image.controller');

router.get('/:type/:filename', imageControllers.getImage);

module.exports = router;
