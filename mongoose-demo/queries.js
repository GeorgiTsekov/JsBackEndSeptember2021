const initDb = require('./dbConfig');
const Person = require('./models/Person');

initDb()
    .then(() => {
        // Native mongodb query
        Person.find({
            $or: [
                { name: 'Tosho' },
                { age: 19 },
                { grade: {$gte: 5.11} }
            ]
        })
            .then(res => {
                console.log(res);
            });

        // Mongoose query
        // Person
        //     .find({})
        //     .where('name').equals('Tosho')
        //     .where('age').gt(18)
        //     .sort({ age: -1 })
        //     .then(res => {
        //         console.log(res);
        //     })
    });