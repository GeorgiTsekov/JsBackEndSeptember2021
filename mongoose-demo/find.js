const initDb = require('./dbConfig');
const Person = require('./models/Person');
const Pet = require('./models/Pet')

initDb();

// Person.find()
//     .then(people => {
//         console.log(people);
//     });

async function getPeople() {
    await initDb();

    let people = await Person.find({age: 19});

    people.forEach(x => console.log(x.greet() + ' - ' + x.isExcellent));
};

async function getPerson(){
    await initDb();

    let person = await Person.findOne({name: 'Pesho'});

    console.log(person);
}

async function getCount(){
    await initDb();

    let count = await Person.countDocuments();

    console.log(count);
}

async function getById(id){
    await initDb();

    let person = await Person.findById(id)
        .populate('pet');

    console.log(person);
}

// getPeople();
// getPerson();
getById('6156ed61a720d3e8c0e292bf');
// getCount();