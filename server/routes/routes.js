const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const Game       = require('../../models/Game');

router.get('/', (req, res) => {
    res.render('index')
});

router.route('/insert').post((req,res) => {
    const game = new Game();
    game.description = req.body.description;
    game.name        = req.body.name;
    game.author      = req.body.author;

    game.save(err => {
        if (err) res.send(err);
        res.send('Game successfully added!');
    });
});

router.route('/update').post((req, res) => {
    const doc = {
        description: req.body.description,
        name: req.body.name,
        author: req.body.author
    };
    console.log(doc);
    Game.update({_id: req.body._id}, doc, (err, result) => {
        if (err) res.send(err);
        res.send('Game successfully updated!');
    });
});

router.get('/delete', (req, res) => {
    const id = req.query.id;
    Game.find({_id: id}).remove().exec((err, expense) => {
        if (err) res.send(err);
        res.send('Game successfully deleted!');
    });
});

// router.get('/getAll',(req, res) => {
//     var monthRec = req.query.month;
//     var yearRec = req.query.year;
//     if (monthRec && monthRec != 'All'){
//         Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, expenses) {
//             if (err) res.send(err);
//             res.json(expenses);
//         });
//     } else {
//         Expense.find({year: yearRec}, function(err, expenses) {
//             if (err) res.send(err);
//             res.json(expenses);
//         });
//     }
// });


module.exports = router;