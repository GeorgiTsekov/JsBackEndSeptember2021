const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    myPosts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post',
        }
    ]
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password)
});

const User = mongoose.model('User', userSchema);

module.exports = User;