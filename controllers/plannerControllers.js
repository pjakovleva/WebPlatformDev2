const { response } = require('express');
const goalPlannerDAO = require('../models/plannerModels.js');
const db = new goalPlannerDAO('goals.db');
db.init();

exports.landing_page = function(req, res) {
    res.render('home', {
        'title': 'Welcome to my application!'
    });
}

exports.goal_planner = function(req, res) {
    db.getAllGoals()
    .then((list) => {
    res.render('goalPLanner',   {
        'title' : 'Goal Planner',
        'goal': list 
}); 
})
.catch((err) => {
    console.log('Goals not found: ', err);
})
db.removeGoal(req.body.user);
db.updateGoal();
}

exports.server_error = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}