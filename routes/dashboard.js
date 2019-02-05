const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// load model
const Game = require('../models/game');

router.get('/', ensureAuthenticated, (req, res) => {
  Game
    .find({ creator: req.user.id })
    .then(games => {
      res.render('dashboard', {
        games
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;