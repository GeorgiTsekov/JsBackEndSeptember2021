const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        //  validations
        minlength: [2, 'Name cannot be lower then 2 symbols'],
        maxlength: [30, 'Name cannot be bigger then 30 symbols'],
    },
    age: {
        type: Number,
        //  validations
        required: false,
        min: [6, 'Age cannot be lower then 6, you got: {VALUE}'],
    },
    grade: {
        type: Number,
        //  validations
        required: false,
        min: [2, 'Grade cannot be lower then 2, you got: {VALUE}'],
        max: [6, 'Grade cannot be bigger then 6, you got: {VALUE}'],
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
});

personSchema.methods.greet = function () {
    return `Hello! I am ${this.name}, ${this.age} years old.`
};

personSchema.virtual('isExcellent')
    .get(function() {
        return this.grade >= 5.5;
    });
// second validations
// personSchema.path('grade').validate(function() {
//     return this.grade >= 2 && this.grade <= 6;
// }, 'Grade shoult be between [2,6]');

const Person = mongoose.model('Person', personSchema);

module.exports = Person;