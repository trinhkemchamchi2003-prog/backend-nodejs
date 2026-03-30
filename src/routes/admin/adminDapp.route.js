const express = require('express');
const router = express.Router();
const adminContactDAppControllers = require('../../controllers/contactDApp.controller');

router.get('/list-send-d-app', adminContactDAppControllers.listSendDApp);
router.delete('/delete-send-d-app/:id', adminContactDAppControllers.deleteSendDApp);

module.exports = router;
