const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../others/db');
const User = db.User;
const Favorite = db.Favorite;

module.exports = {
    authenticate,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser: _deleteUser
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPassword } = user.toObject();
        //const newUser = user.toObject();
        const token = jwt.sign({ sub: user._id }, config.secret, {expiresIn: '1d'});
        return {
            ...userWithoutPassword,
            //...newUser,
            token
        };
    }
}

async function getAllUsers() {
    return await User.find().select('-password');
}

async function getUserById(id) {
    return await User.findById(id).select('-password');
}

async function createUser(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function updateUser(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    if(!userParam.password) {
        userParam.password = user.password;
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _deleteUser(id) {
    await Favorite.deleteMany({userid: id});
    await User.findByIdAndRemove(id);
}