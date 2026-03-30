const express = require('express');
const router = express.Router();
const coreTeamControllers = require('../../controllers/coreTeam.controller');

router.get('/members', coreTeamControllers.adminGetMember);
router.get('/members/:id', coreTeamControllers.adminGetMemberDetail);

router.post('/create-member', coreTeamControllers.adminCreateMember);
router.post('/create-translation/:id', coreTeamControllers.adminCreateTranslation);

router.put('/update-member/:id', coreTeamControllers.adminUpdateMember);
router.put('/update-translation/:coreTeamId', coreTeamControllers.adminUpdateTranslation);

router.delete('/destroy-member/:id', coreTeamControllers.adminDestroyMember);
router.delete('/destroy-translation/:coreTeamId', coreTeamControllers.adminDestroyTranslation);

module.exports = router;
