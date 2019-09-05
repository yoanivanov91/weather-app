const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', registerUser);
router.get('/', getAllUsers);
router.get('/current', getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', _deleteUser);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function registerUser(req, res, next) {
    userService.createUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrentUser(req, res, next) {
    userService.getUserById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserById(req, res, next) {
    userService.getUserById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateUser(req, res, next) {
    userService.updateUser(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteUser(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}