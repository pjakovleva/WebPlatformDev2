const { response } = require('express');
const goalCalendarDAO = require('../models/calendarModels.js');
const userDao = require('../models/userModel.js');
const db = new goalCalendarDAO('goals.db');
db.init();

//LANDING PAGE 
exports.landing_page = function(req, res) {
    res.render('landingPage', {
        'title': 'Welcome'});
}

// REGISTRATION
// implementing the ability to use the registration page
exports.show_register_page = function(req, res) { 
    res.render('user/register', {
        'title': 'Goal Calendar'});
}

// implementing the ability to register new users
exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    console.log('New user registered. Username: ', user, 'Password: ',  password);
    if (!user || !password) {
        res.send('goal must contain username and password.');
return; }
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send('User with the same name already exists', user);
return; }
        userDao.create(user, password);
        res.redirect('/login');
    });
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