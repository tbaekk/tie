const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    thumbnail: {
        type: String,
        default: 'http://lorempixel.com/640/480/cats/' 
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isValidated: {
        type: Boolean,
        default: false
    }
});

let Game = null;
try {
    Game = mongoose.model('Game', GameSchema);
} catch (e) {
    Game = mongoose.model('Game');
}

module.exports = Game;
