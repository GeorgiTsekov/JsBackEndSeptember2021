const eventBus = require('./eventBus.js');

let unsubscribe = eventBus.subscribe('areWeThereYet', function (town) {
    console.log('Yeeeeee we are in ', town);
});

eventBus.subscribe('customEvent', (firstPerson, secondPerson) => {
    console.log('custom event triggered', firstPerson, secondPerson);
});

eventBus.publish('areWeThereYet', 'Sofia');
eventBus.publish('customEvent', 'Pesho', 'Gosho');

unsubscribe();

eventBus.publish('areWeThereYet', 'Pleven');
eventBus.publish('customEvent', 'Tosho', 'Sasho');