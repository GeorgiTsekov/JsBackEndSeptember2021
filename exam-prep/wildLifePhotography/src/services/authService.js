const jwt = require('../utils/jwt');
const User = require('../models/User');
const { JWT_SECRET } = require('../constants');

exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });

    if (!user) {
        throw new Error('invalid email or password!');
    }

    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('invalid email or password!');
    }

    let payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    let token = jwt.sign(payload, JWT_SECRET);

    return token;
}

exports.addPost = async (userId, postId) => {
    let user = await this.getOne(userId);

    user.myPosts.push(postId);
    return await user.save();
}

exports.deletePost = async (postId, userId) => {
    let user = await this.getOne(userId);

    let index = await user.myPosts.indexOf(postId);

    user.myPosts.splice(index, 1);

    return await user.save();
}

exports.register = (userData) => User.create(userData);

exports.getOne = (userId) => User.findById(userId);