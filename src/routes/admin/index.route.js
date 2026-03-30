const express = require('express');
const router = express.Router();
const adminContactRoutes = require('./adminDApp.route');
const authRoutes = require('./auth.route');
const manageRoutes = require('./manage.route');
const partnerRoutes = require('./partner.route');
const imageRoutes = require('./image.route');
const configRoutes = require('./config.route');
const coreTeamRoutes = require('./coreTeam.route');
const languageRoutes = require('./language.route');
const newsRoutes = require('./news.route');

const { verifyTokenAdmin } = require('../../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use(verifyTokenAdmin);
router.use('/image', imageRoutes);
router.use('/config', configRoutes);
router.use('/core-team', coreTeamRoutes);
router.use('/d-app', adminContactRoutes);
router.use('/language', languageRoutes);
router.use('/manage', manageRoutes);
router.use('/news', newsRoutes);
router.use('/partner', partnerRoutes);

module.exports = router;
