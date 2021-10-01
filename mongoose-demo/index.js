const initDb = require('./dbConfig');
const Person = require('./models/Person');
const Pet = require('./models/Pet');

initDb()
    .then(() => {
        // first way to create db record
        // let person = new Person({
        //     name: 'Gosho',
        //     age: 28,
        // });

        // person.save()
        //     .then(() => {
        //         console.log('Person saved!');
        //     });

        //second way
        Person.create({
            name: 'o',
            age: 19,
            grade: 7,
        })
            .then(person => {
                console.log('Person created!');
                console.log(person);
            })

        Pet.create({
            name: 'Jina',
            species: 'Dog',
            age: 1,
        })
            .then(pet => {
                return Person.create({
                    name: 'Gogo',
                    age: 11,
                    grade: 5,
                    pet: pet
                })
            })
            .then(res => {
                console.log(res);
            })
    });