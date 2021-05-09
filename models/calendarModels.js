const Datastore = require('nedb');
const auth = require('../auth/auth.js');
const { ensureLoggedIn } = require('connect-ensure-login');

class GoalCalendar {

    // constructor for the GoalPlanner class
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({
                filename: dbFilePath,
                autoload: true
            });
        } else {
            this.db = new Datastore();
        }
    }

    // seeding the database for in-memory use
    init() {
        this.db.insert({
                author: 'Polina',
                week: 'Current Week',
                status: 'Incomplete',
                weekGoals: [{
                        dayOfWeek: 'Wednesday',
                        dateOfMonth: '05/05/2021',
                        typeOfExercise: 'Yoga',
                        goalDuration: '1 Hour',
                        actualDuration: '40 Minutes',
                    },
                    { 
                        dayOfWeek: 'Thursday',
                        dateOfMonth: '06/05/2021',
                        typeOfExercise: 'Running',
                        goalDuration: '45 Minutes',
                        actualDuration: '30 Minutes',
                    },
                    {
                        dayOfWeek: 'Friday',
                        dateOfMonth: '07/05/2021',
                        typeOfExercise: 'Boxing',
                        goalDuration: '2 Hours',
                    }, 

                ]
            }, function(err, doc) {
                if (err) {
                    console.log('Error inserting goals into database:', err);
                } else {
                    console.log('Polina\'s goals inserted into the database.');
                }
            });

            this.db.insert({
                author: 'Polina',
                status: 'Incomplete',
                week: 'Last Week',
                weekGoals: [{
                        dayOfWeek: 'Wednesday',
                        dateOfMonth: '28/04/2021',
                        typeOfExercise: 'Hiking',
                        goalDuration: '3 Hours',
                        actualDuration: '40 Minutes',
                    },
                    { 
                        dayOfWeek: 'Thursday',
                        dateOfMonth: '29/04/2021',
                        typeOfExercise: 'Running',
                        goalDuration: '40 Minutes',
                        actualDuration: '30 Minutes',
                    },
                    {
                        dayOfWeek: 'Friday',
                        dateOfMonth: '30/04/2021',
                        typeOfExercise: 'Tennis',
                        goalDuration: '1 Hour',
                    }, 

                ]
            }, function(err, doc) {
                if (err) {
                    console.log('Error inserting goals into database:', err);
                } else {
                    console.log('Polina\'s goals inserted into the database.');
                }
            });

            this.db.insert({
                author: 'John',
                status: 'Incomplete',
                week: 'Current Week',
                weekGoals: [{
                        dayOfWeek: 'Wednesday',
                        dateOfMonth: '05/05/2021',
                        typeOfExercise: 'Weightlifting',
                        goalDuration: '1 Hour',
                        actualDuration: '40 Minutes',
                    },
                    { 
                        dayOfWeek: 'Thursday',
                        dateOfMonth: '06/05/2021',
                        typeOfExercise: 'Stretching',
                        goalDuration: '45 Minutes',
                    },
                    {
                        dayOfWeek: 'Friday',
                        dateOfMonth: '07/05/2021',
                        typeOfExercise: 'Swimming',
                        goalDuration: '2 Hours',
                    }, 

                ]
            }, function(err, doc) {
                if (err) {
                    console.log('Error inserting goals into database:', err);
                } else {
                    console.log('John\'s goals inserted into the database.');
                }
            });

            this.db.insert({
                author: 'John',
                status: 'Complete',
                week: 'Last Week',
                weekGoals: [{
                        dayOfWeek: 'Wednesday',
                        dateOfMonth: '05/05/2021',
                        typeOfExercise: 'Weightlifting',
                        goalDuration: '1 Hour',
                        actualDuration: '40 Minutes',
                    },
                    { 
                        dayOfWeek: 'Thursday',
                        dateOfMonth: '06/05/2021',
                        typeOfExercise: 'Stretching',
                        goalDuration: '45 Minutes',
                        actualDuration: '30 Minutes',
                    },
                    {
                        dayOfWeek: 'Friday',
                        dateOfMonth: '07/05/2021',
                        typeOfExercise: 'Rugby',
                        goalDuration: '2 Hours',
                        actualDuration: '1 Hour 20 Minutes',
                    }, 

                ]
            }, function(err, doc) {
                if (err) {
                    console.log('Error inserting goals into database:', err);
                } else {
                    console.log('John\'s goals inserted into the database.');
                }
            });
    }


    // function that retrieves all goals from the database
    getAllGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, goals) {
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);
                }
            })
        })
    }

    getGoalsByPolina(author) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': author }, function(err, goals) {
                if (err) {
                    reject(err);
                } else {
                    resolve(goals);
                }
}) })
}

    // function that allows to delete goals for the week
    deleteGoal() {
        return new Promise((resolve, reject) => {
        this.db.remove({ status: 'Complete' }, {}, function(err, numRemoved) {
            if (err) {
                console.log('Error deleting goals: ', err);
            } else {
                console.log(numRemoved, 'Goals successfully deleted,');
            }
        })
    })}

    // function that allows a goal to be modified
    updateGoal() {
        return new Promise((resolve, reject) => {
        this.db.update({
            'author': 'John', 'weekGoals.typeOfExercise': 'Swimming'
        }, {
            $set: {
                'typeOfExercise': 'Volleyball'
            }
        }, {}, function(err, newDocs) {
            if (err) {
                console.log('Failed to update goal: ', err);
            } else {
                console.log(newDocs, 'Goal successfully updated.');
            }
        })
    })}

    // function that allows new goals to be created and added to the database
    addGoals(author, week, dayOfWeek, dateOfMonth, typeOfExercise, goalDuration) {
        var goals = {
            author: author,
            week: week,
            weekGoals: {
            dayOfWeek,
            dateOfMonth,
            typeOfExercise,
            goalDuration }
        };
        console.log('New goals created:', dayOfWeek)

        this.db.insert(goals, function(err, doc) {
            if (err) {
                console.log('Error inserting a new goals to database.', typeOfExercise);
            } else {
                console.log('New goals added to database.', doc);
            }
        });
    }

            // Shareable link implementation attempt. Function that retrieves a goal by its ID. 
        getGoalByID(_id) {
            return new Promise((resolve, reject) => {
                this.db.find({ "_id": _id }, function (err, goals) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(goals);
                    }
                });
            });
        }

}

// Making the module visible outside
module.exports = GoalCalendar;

