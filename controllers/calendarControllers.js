const { response } = require('express');
const goalCalendarDAO = require('../models/calendarModels.js');
const db = new goalCalendarDAO('goals.db');
db.init();

//LANDING PAGE 
exports.landing_page = function(req, res) {
    res.render('landingPage', {
        'title': 'Welcome'});
}

// GOAL CALENDAR
// implementing the ability to view a user's goal calendar 
exports.goal_calendar = function(req, res) {
    let author = 'Polina';
    db.getGoalsByPolina(author).then((list) => {
    res.render('goalCalendar', {
     'title': 'Goal Calendar',
     'week': list,
     'user': req.user
 });
}).catch((err) => {
    console.log('Error retrieving all goals: ', err);
})

db.deleteGoal();
db.updateGoal();
}

// NEW GOAL
// implementing the ability to use the new goal form 
exports.show_new_goals = function(req, res) {
    res.render('newGoal', {
        'title': 'Goal Calendar',
        'user': req.user
    })
}

// implementing the new goal form's ability to handle requests 
exports.post_new_goals = function(req, res) {
    if (!req.body.typeOfExercise) {
        response.status(400).send('Goal calendar entries must have the month specified.');
        return;
}
    db.addGoals(req.body.author, req.body.week, req.body.dayOfWeek, req.body.dateOfMonth, req.body.typeOfExercise, req.body.goalDuration);
    res.redirect('/mycalendar');
}

exports.server_error = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}