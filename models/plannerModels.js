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
// update details for a goal
updateGoal() {
    return new Promise((resolve, reject) => {
    this.db.update({ 'user': 'John', 'goal.typeOfExercise': 'Basketball'}, { $set: { 'typeOfExercise': 'Running'} }, {}, function(err, newDocs) {
    if (err) {
    console.log('Failed to update goal', err);
    }  else {
    console.log(newDocs, 'goal updated.');
    }
    })
    })}

    // delete goals of certain user
removeGoal() {
    return new Promise((resolve, reject) => {
    this.db.remove({ name : 'Katie'}, {}, function(err, remGoal) {
    if (err) {
    console.log('Failed to delete goal.');
    } else {
    console.log('Katie\'s goal has been deleted.');
    }
    })})}

    // see the goals  
getAllGoals() {
    return new Promise((resolve, reject) => {
        this.db.find({}, function(err, goals) {
            if (err) {
                reject(err);
            } else {
                resolve(goals);
} })
}) }

// search goal by type of exercise
getJohnsGoals() {
    return new Promise((resolve, reject) => {
        this.db.find({ 'John': user }, function(err, goals) {
            if (err) {
                reject(err);
            } else {
                resolve(goals);
                console.log('Search results: ', goals);
            }
        })
    })
}

// create new goal and add it to the database
addGoal(user, typeOfExercise, goalDate, exerciseDuration) {
    var goal = {
        user: user,
        typeOfExercise: typeOfExercise,
        goalDate: goalDate,
        exerciseDuration: exerciseDuration,
    }
    console.log('Goal added: ', goal); 

    this.db.insert(goal, function(err, doc) {
        if (err) {
            console.log('Error inserting new goal', typeOfExercise);
        } else {
            console.log('Goal added to the database: ', doc);
        }
})
}

}

module.exports = GoalPlanner;