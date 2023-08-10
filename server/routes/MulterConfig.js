'use strict';

const multer = require('multer');
const upload = multer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const photoUpload = multer({ storage: storage });

module.exports = {
  upload,
  photoUpload
};
