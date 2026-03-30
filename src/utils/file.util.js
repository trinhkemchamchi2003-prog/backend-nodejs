const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// SAVE LOG ERROR
const saveLogsError = (error, fileName) => {
  const folderName = dayjs().format('YYYY-MM-DD');
  const directoryPath = './src/errors/' + folderName;
  const filePath = path.join(directoryPath, fileName + '.txt');

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
  let newContent = '';
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    newContent = content + '\n' + error;
  } else {
    newContent = error;
  }
  fs.writeFileSync(filePath, newContent);
  return true;
};

// RESIZE IMAGE
const processImage = async (file, options = {}) => {
  const image = sharp(file.buffer);
  const metadata = await image.metadata();

  if (options.width && options.height) {
    return image
      .resize(options.width, options.height, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 90 })
      .toBuffer();
  }

  // Ảnh thường
  const width = Math.min(metadata.width, 1200);
  return image.resize(width, null, { withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
};

module.exports = {
  saveLogsError,
  processImage,
};
