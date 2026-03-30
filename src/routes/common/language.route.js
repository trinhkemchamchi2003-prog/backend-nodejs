const express = require('express');
const router = express.Router();
const languageControllers = require('../../controllers/language.controller');

router.get('/', languageControllers.getLanguage);

module.exports = router;
