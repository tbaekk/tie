const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID } = require('../config/prod');

require('dotenv').config();

console.log(process.env.AWS_SECRET_ACCESS_KEY);
console.log(process.env.AWS_ACCESS_KEY_ID);

// configure aws
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
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
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;
