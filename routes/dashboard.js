const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render('dashboard', {
    user: req.user
  });
});