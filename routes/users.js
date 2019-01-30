const express  = require('express');
const bycrpt   = require('bcrypt');
const passport = require('passport');
const router   = express.Router();
// load User model
const User = require('../models/user');

/* GET users listing. */
router.get('/login', (req, res, next) => res.render('login'));

router.get('/register', (req, res, next) => res.render('register'));

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // check password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // validation passed
    User
      .findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          bycrpt.genSalt(10, (err, salt) => {
            bycrpt.hash(newUser.password, salt, (err,hash) => {
              if (err) throw err;
              // set password to hashed
              newUser.password = hash;
              // save user
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;