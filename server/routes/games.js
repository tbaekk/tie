const fs = require('fs');
const express = require('express');
const router  = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// load model
const Game = require('../models/game');

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('upload');
});

router.post('/create', ensureAuthenticated, (req, res) => {
  if (req.files) {
    const { title, description } = req.body;
    const { creator } = {creator: req.user.id};

    // save meta data to mongo
    const newGame = new Game({
      title,
      creator,
      description
    });
    newGame
      .save()
      .then(game => {
        // create directory in tmp if not exist
        const dir = './tmp';
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        const file = req.files.file;
        const filename = file.name;

        // save file
        file.mv(dir+'/'+filename, err => {
          if (err) {
            console.log(err);
            res.send('error occured');
          } else {
            res.redirect('/dashboard');
          }
        });
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;