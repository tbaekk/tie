const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/prod');

// configure aws
aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' 
  || file.mimetype === 'image/png'
  || file.mimetype === 'text/html'
  || file.mimetype === 'text/css'
  || file.mimetype === 'text/javascript'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'tie-cs-494-demo',
    contentDisposition: 'inline',
    contentType: function(req, file, cb) {
      cb(null, file.mimetype);
    },
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const foldername = req.body.title.toLowerCase();
      const fullpath = foldername + '/' + file.originalname;
      cb(null, fullpath);
    }
  })
});

module.exports = upload;
