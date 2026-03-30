const express = require('express');
const router = express.Router();
const languageControllers = require('../../controllers/language.controller');

router.post('/create', languageControllers.adminCreateLanguage);

router.put('/update/:id', languageControllers.adminUpdateLanguage);

router.delete('/destroy/:id', languageControllers.adminDestroyLanguage);

router.get('/', languageControllers.adminGetLanguage);

module.exports = router;
