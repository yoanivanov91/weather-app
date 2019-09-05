const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../others/db');
const Favorite = db.Favorite;

module.exports = {
    getAllFavorites,
    getFavoriteById,
    addFavorite,
    updateFavorite,
    removeFavorite: _removeFavorite
};

async function getAllFavorites(userid) {
    return await Favorite.find({ userid: userid });
}

async function getFavoriteById(userid, cityname) {
    const favorite = Favorite.find({userid: userid, name: cityname});
    return await Favorite._id;
}

async function addFavorite(favoriteParam) {
    // validate
    if (await Favorite.findOne({ userid: favoriteParam.userid, name: favoriteParam.name })) {
        throw favoriteParam.name + '" is already in Favorites';
    }

    const favorite = new Favorite(favoriteParam);

    // save favorite
    await favorite.save();
}

async function updateFavorite(id, favoriteParam) {
    const favorite = await Favorite.findById(id);

    // validate
    if (!favorite) throw 'Favorite not found';
    if (favorite.name !== favoriteParam.name && await Favorite.findOne({ name: favoriteParam.name })) {
        throw favoriteParam.name + '" already exists';
    }

    // copy favoriteParam properties to favorite
    Object.assign(favorite, favoriteParam);

    await favorite.save();
}

async function _removeFavorite(userid, cityname) {
    await Favorite.deleteOne({userid: userid}, {name: cityname});
    //await Favorite.findByIdAndRemove(id);
}