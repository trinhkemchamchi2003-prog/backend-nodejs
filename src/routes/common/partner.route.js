const express = require('express');
const router = express.Router();
const partnerControllers = require('../../controllers/partner.controller');

router.get('/field', partnerControllers.getPartnerField);
router.get('/', partnerControllers.getPartner);

module.exports = router;
