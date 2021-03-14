const Datastore = require('nedb');

class GoalPlanner {

    // constructor for the GoalPlanner class.
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
         } else {
            this.db = new Datastore();
    } }

    // seeding the database
    init() {
        this.db.insert({ 
            user: 'John',
            age: 22,
            goal: [{
            typeOfExercise: 'Basketball',
            goalDate: '2020-02-16',
            exerciseDuration: '1 Hour'
            }]
}); 
                console.log('John\'s goals inserted.');

        this.db.insert({
            user: 'Katie',
            age: 44,
            goal: [{
            typeOfExercise: 'Yoga',
            goalDate: '2020-02-14',
            exerciseDuration: '1 Hour'
        }]
});
                console.log('Katie\'s goals inserted.')
            }


}