const express = require('express');
const router = express.Router();
const contactControllers = require('../../controllers/contact.controller');

router.get('/list-type-dapp', contactControllers.listTypeDApp);
router.post('/send', contactControllers.sendContact);
router.post('/send-dapp', contactControllers.sendContactDApp);
router.post('/send-grant-category', contactControllers.sendContactGrantCategory);

router.post('/partner', contactControllers.createContactPartner);

module.exports = router;
