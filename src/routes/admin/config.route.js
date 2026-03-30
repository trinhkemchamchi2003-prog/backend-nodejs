const express = require('express');
const router = express.Router();
const configControllers = require('../../controllers/config.controller');

router.get('/', configControllers.getConfig);
router.put('/update/:id', configControllers.updateConfig);

module.exports = router;
