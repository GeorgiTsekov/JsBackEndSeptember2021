const jwt = require('../utils/jwt');
const User = require('../models/User');
const { JWT_SECRET } = require('../constants');

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        throw new Error('invalid username or password!');
    }

    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('invalid username or password!');
    }

    let payload = {
        _id: user._id,
        username: user.username,
        address: user.address,
    }

    let token = jwt.sign(payload, JWT_SECRET);

    return token;
}

exports.addPublication = async (userId, publicationId) => {
    let user = await this.getOne(userId);

    user.myPublications.push(publicationId);
    return await user.save();
}

exports.deletePublication = async (publicationId, userId) => {
    let user = await this.getOne(userId);

    let index = await user.myPublications.indexOf(publicationId);

    user.myPublications.splice(index, 1);

    return await user.save();
}

exports.register = (userData) => User.create(userData);

exports.getOne = (userId) => User.findById(userId);