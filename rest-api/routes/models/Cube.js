const mongoose = require('mongoose');
const validator = require('validator');

// if (!validator.isURL(imageUrl)) {
//     return res.status('400').send('Invalid Email!');
// }

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9 ]+$/, 'Name shout consist english letters and digits only!!!'],
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300,
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: [/^https?:\/\/.+/i, 'Invalid image url!'],
        validate: validator.isURL,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

// Only for demo
// cubeSchema.statics.findByName = function(name) {
//     return this.find({name});
// };

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;