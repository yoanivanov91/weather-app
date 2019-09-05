//Database connection

const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL || config.connection, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Favorite: require('../favorites/favorite.model')
};