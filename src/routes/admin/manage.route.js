const express = require('express');
const router = express.Router();
const manageControllers = require('../../controllers/manage.controller');

router.get('/mail-contact', manageControllers.mailContact);
router.get('/mail-contact-app', manageControllers.mailContactApp);
router.get('/mail-contact-partner', manageControllers.mailContactPartner);

router.put('/status-contact-partner/:id', manageControllers.updateStatusPartner);

module.exports = router;
