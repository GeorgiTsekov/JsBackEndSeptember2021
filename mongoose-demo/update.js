const initDb = require('./dbConfig');
const Person = require('./models/Person');
initDb()
    .then(() => {
        Person.updateOne({ name: 'Pesho' }, { $set: { name: 'Sasho', age: 34, grade: 5.11 } })
            .then(res => {
                console.log('Updated');
                console.log(res);
            });
    });