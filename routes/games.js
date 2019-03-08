const express = require('express');
const router  = express.Router();
const upload = require('../services/upload');
const { ensureAuthenticated } = require('../config/auth');

// load model
const Game = require('../models/game');

const multiUpload = upload.fields([
  { name: 'sourceFiles', maxCount: 30 },
  { name: 'imageFile', maxCount: 1 }
]);

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('upload');
});

router.post('/upload', ensureAuthenticated, (req, res) => {
  multiUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
    const { title, description } = req.body;
    const { creator } = { creator: req.user.id };

    let thumbnail;
    if (req.files.imageFile) {
      thumbnail = req.files.imageFile[0].location;
    }

    const newGame = new Game({
      title,
      creator,
      description,
      thumbnail
    });
    newGame
      .save()
      .then(game => {
        res.redirect('/dashboard');
      })
      .catch(err => console.log(err));
  });
});

router.get('/:gameTitle', (req, res) => {
  Game.findOne({title: req.gameTitle})
    .then(game => {
      res.render('tetris', { game });
    });
});

module.exports = router;