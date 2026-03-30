const express = require('express');
const router = express.Router();
const partnerControllers = require('../../controllers/partner.controller');

router.post('/create', partnerControllers.adminCreatePartner);
router.post('/create-field', partnerControllers.adminCreateField);

router.put('/update/:id', partnerControllers.adminUpdatePartner);

router.delete('/destroy/:id', partnerControllers.adminDestroyPartner);
router.delete('/destroy-field/:id', partnerControllers.adminDestroyField);

router.get('/field', partnerControllers.adminGetField);
router.get('/', partnerControllers.adminGetPartner);

module.exports = router;
