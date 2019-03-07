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

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only ZIP is allowed!'), false);
//   }
// }

const upload = multer({
  // fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'tie-cs-494-demo',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const foldername = req.body.title + '-' + req.user.id;
      const fullpath = foldername + '/' + file.originalname;
      cb(null, fullpath);
    }
  })
});

module.exports = upload;
