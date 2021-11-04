const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required!'],
        unique: true,
        // validate: [/^[a-zA-Z0-9]+$/, 'Username should consist english letters and digits only!'],
        validate: [validator.isEmail, 'Username shout be email'],
        maxlength: 20,
        minlength: 5,
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        validate: [validator.isStrongPassword, 'Password shoult be strongest!!! (min: 8 characters, min 1 lower letter, min 1 upper letter, min 1 number and min 1 symbol'],
    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});

userSchema.method('validatePassword', function() {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;