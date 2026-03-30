const express = require('express');
const router = express.Router();
const newsControllers = require('../../controllers/news.controller');

router.get('/', newsControllers.getNews);
router.get('/pinned', newsControllers.getNewsPinned);

module.exports = router;
