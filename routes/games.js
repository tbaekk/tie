const express = require('express');
const router  = express.Router();
const upload = require('../services/upload');
const { ensureAuthenticated } = require('../config/auth');

// load model
const Game = require('../models/game');

const singleUpload = upload.single('file');

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.single('file'), (req, res) => {
  // singleUpload(req, res, function(err) {
  //   console.log(req.file);
  //   if (err) {
  //     return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
  //   }

  //   return res.json({'imageUrl': req.file.location});
  // });
  res.send(req.file);
  console.log(req.file);
});

module.exports = router;