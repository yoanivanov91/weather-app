const express = require('express');
const router = express.Router();
const favoriteService = require('./favorite.service');

// routes
router.get('/:userid', getAllFavorites);
router.get('/:userid/:name', getFavoriteById);
router.post('/add', addFavorite);
router.put('/:userid/:name', updateFavorite);
router.delete('/:userid/:name', _removeFavorite);

module.exports = router;

function getAllFavorites(req, res, next) {
    favoriteService.getAllFavorites(req.params.userid)
        .then(favorites => res.json(favorites))
        .catch(err => next(err));
}

function getFavoriteById(req, res, next) {
    favoriteService.getFavoriteById(req.params.userid, req.params.name)
        .then(favorite => favorite ? res.json(favorite) : res.sendStatus(404))
        .catch(err => next(err));
}

function addFavorite(req, res, next) {
    favoriteService.addFavorite(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateFavorite(req, res, next) {
    favoriteService.updateFavorite(req.params.userid, req.params.name, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _removeFavorite(req, res, next) {
    favoriteService.removeFavorite(req.params.userid, req.params.name)
        .then(() => res.json({}))
        .catch(err => next(err));
}