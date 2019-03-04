const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('upload');
});

router.post('/create', (req, res) => {
  if (req.files) {
    const file = req.files.file;
    const filename = file.name;



    // file.mv('./'+filename, err => {
    //   if (err) {
    //     console.log(err);
    //     res.send('error occured');
    //   } else {
    //     res.send('done');
    //   }
    // });
  }
});

module.exports = router;