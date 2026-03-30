const express = require('express');
const router = express.Router();
const coreTeamControllers = require('../../controllers/coreTeam.controller');

router.get('/members', coreTeamControllers.getMember);

module.exports = router;
