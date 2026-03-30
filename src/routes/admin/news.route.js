const express = require('express');
const router = express.Router();
const newsControllers = require('../../controllers/news.controller');

router.post('/create', newsControllers.adminCreateNews);
router.post('/create-translation/:id', newsControllers.adminCreateTranslation);

router.put('/update/:id', newsControllers.adminUpdateNews);
router.put('/update-translation/:transId', newsControllers.adminUpdateTranslation);

router.delete('/destroy/:id', newsControllers.adminDestroyNews);
router.delete('/destroy-translation/:transId', newsControllers.adminDestroyTranslation);

router.get('/', newsControllers.adminGetNews);
router.get('/detail/:id', newsControllers.adminGetNewsDetail);
router.get('/category', newsControllers.adminGetCategory);

module.exports = router;
