const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Tie' });
});

router.post('/login', (req,res) => {
  User.findOne({email: req.body.email})
   .exec()
   .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
         if(err) {
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         }
         if(result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
              _id: user._id
            },
            'secret',
            {
              expiresIn: '2h'
            }
          );
          return res.status(200).json({
            success: 'Welcome to the JWT Auth',
            token: JWTToken
          });
         }
         return res.status(401).json({
            failed: 'Unauthorized Access'
         });
      });
   })
   .catch(error => {
      res.status(500).json({
         error: error
      });
   });;
});

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
       return res.status(500).json({
          error: err
       });
    } else {
      const user = new User({
        _id: new  mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash    
      });
      user.save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            success: 'New user has been created'
          });
        })
        .catch(error => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

module.exports = router;
