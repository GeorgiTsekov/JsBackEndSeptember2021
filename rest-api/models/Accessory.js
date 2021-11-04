const mongoose = require('mongoose');
const validator = require('validator');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required!'],
        validate: [/^[a-zA-Z0-9 ]+$/, 'Name shout consist english letters, digits and spaces only!!!'],
        unique: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required!'],
        // validate: [/^https?:\/\/.+/i, 'Invalid image url!']
        validate: validator.isURL,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300,
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;