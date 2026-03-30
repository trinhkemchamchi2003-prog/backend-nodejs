const multer = require('multer');
const path = require('path');

const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedFileExtensions.includes(ext)) {
      return cb(new Error('Invalid file format!'));
    }
    cb(null, true);
  },
});

module.exports = { upload };
