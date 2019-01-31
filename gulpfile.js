const User = require('models/user');
const Game = require('models/game');
const faker = require('faker');

function genFake() {
    const fakeGames = [];
    for (let i = 0; i < n; i++) {
        fakeGames.push({
            title: faker.commerce.productName(),
            creator: faker.internet.userName(),
            thumbnail: faker.image.abstract(),
        });
    }
    Game.insertMany(fakeGames)
        .then(bulkGames => {
            bulkGames.forEach((user) => savedFakeGames.push(user.id));
            // savedFakeGames.push(...bulkGames.insertedIds);
        })
        .catch(err => console.log(err));

    const fakeUsers = [];
    for (let i = 0; i < n; i++) {
        fakeUsers.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
    }
    User.insertMany(fakeUsers)
        .then(bulkUsers => {
            bulkUsers.forEach((user) => savedFakeUsers.push(user.id));
            // savedFakeUsers.push(...bulkUsers.insertedIds);
        })
        .catch(err => console.log(err));
}

exports.genfake = genFake;
