const express = require('express');
const router = express.Router();
const imageControllers = require('../../controllers/image.controller');
const { upload } = require('../../middlewares/image.middleware');
const { handleResponse, handleFailed } = require('../../utils/handleResponse.util');

router.get('/folder/:type', imageControllers.getFolderImage);
router.get('/types', imageControllers.getTypeImage);

router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return handleResponse(res, handleFailed(err.message));
    }
    if (!req.file) {
      return handleResponse(res, handleFailed('File is required!'));
    }
    imageControllers.uploadImage(req, res);
  });
});

router.delete('/destroy/:type/:filename', imageControllers.destroyImage);

module.exports = router;
