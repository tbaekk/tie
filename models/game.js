const mongoose = require('mongoose');
const faker = require('faker');
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
    // htmlSources: [{

    // }],
    // cssSources: [{

    // }],
    // jsSources: [{

    // }],
    date: {
        type: Date,
        default: Date.now
    }
});

const savedFakeGames = [];

GameSchema.statics.generateFakeGames = function (n = 5) {
    const fakeGames = [];
    for (let i = 0; i < n; i++) {
        fakeGames.push({
            title: faker.commerce.productName(),
            creator: faker.internet.userName(),
            thumbnail: faker.image.abstract(),
        });
    }
    this.insertMany(fakeGames)
        .then(bulkGames => {
            bulkGames.forEach((user) => savedFakeGames.push(user.id));
            // savedFakeGames.push(...bulkGames.insertedIds);
        })
        .catch(err => console.log(err));
}

GameSchema.statics.clearFakeGames = function () {
    let id;
    while (savedFakeGames.length !== 0) {
        id = savedFakeGames.pop();
        this.deleteOne({
            _id: id
        });
    }
}

let Game = null;
try {
    Game = mongoose.model('Game', GameSchema);
} catch (e) {
    Game = mongoose.model('Game');
}

module.exports = Game;
