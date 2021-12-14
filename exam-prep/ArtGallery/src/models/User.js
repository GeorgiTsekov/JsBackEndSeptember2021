const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    address: {
        type: String,
        required: true,
        maxlength: 20,
    },
    myPublications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication',
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