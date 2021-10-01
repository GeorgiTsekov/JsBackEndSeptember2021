const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        //  validations
        minlength: [2, 'Name cannot be lower then 2 symbols'],
        maxlength: [30, 'Name cannot be bigger then 30 symbols'],
    },
    species: {
        type: String,
        //  validations
        required: true,
    },
    age: {
        type: Number,
        //  validations
        required: true,
    },
});

let Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;