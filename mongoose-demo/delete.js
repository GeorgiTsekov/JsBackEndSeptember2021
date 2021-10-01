const initDb = require('./dbConfig');
const Person = require('./models/Person');
initDb()
    .then(() => {
        Person.findByIdAndDelete({ _id: '6156b8159abb9fc1b40ee6f4' })
            .then(res => {
                console.log('deleted');
                console.log(res);
            });
    });