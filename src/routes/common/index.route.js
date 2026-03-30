const express = require('express');
const router = express.Router();
const contactRoutes = require('./contact.route');
const partnerRoutes = require('./partner.route');
const imageRoutes = require('./image.route');
const coreTeamRoutes = require('./coreTeam.route');
const languageRoutes = require('./language.route');
const newsRoutes = require('./news.route');

router.use('/contact', contactRoutes);
router.use('/core-team', coreTeamRoutes);
router.use('/image', imageRoutes);
router.use('/language', languageRoutes);
router.use('/news', newsRoutes);
router.use('/partner', partnerRoutes);

module.exports = router;
