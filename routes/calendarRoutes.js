const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/calendarControllers.js');

// Template responses and post requests 

router.get("/", controller.landing_page); 

// route for the user's goal calendar page
router.get('/mycalendar', controller.goal_calendar);

// routes for the new goal goal page
router.get('/newgoals', controller.show_new_goals);
router.post('/newgoals', controller.post_new_goals);

// HTML response
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

// 404 response
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

// 500 response
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;