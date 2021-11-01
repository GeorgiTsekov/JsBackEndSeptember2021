const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = ({ email, password }) => User.create({ email, password });

exports.login = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        let token = jwt.sign({ _id: user._id, email: user.email }, 'SECRETSOMETHING');

        return { user, token };
    } else {
        throw new Error('No such user');
    }
}