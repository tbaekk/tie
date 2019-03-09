const express = require('express');
const router = express.Router();

const Game = require('../models/game');

/* GET home page. */
router.get('/', (req, res, next) => {
  Game.find({})
    .then(games => {
      res.render('index', {games});
    });
});

module.exports = router;