const express = require('express');
const router = express.Router(); 
const auth = require('../auth/auth.js'); 
const {ensureLoggedIn} = require('connect-ensure-login');
const controller = require('../controllers/calendarControllers.js');

// Template responses and post requests 

router.get("/", controller.landing_page); 

// routes for the registration page
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

// routes for the login page
router.get('/login', controller.show_login_page);
router.post('/login', auth.authorize('/login'), controller.post_login);

router.get('/logout', controller.logout);

// route for the user's goal calendar page
router.get('/mycalendar', ensureLoggedIn('/login'), controller.goal_calendar);

// routes for the new goal goal page
router.get('/newgoals', ensureLoggedIn('/login'), controller.show_new_goals);
router.post('/newgoals', ensureLoggedIn('/login'), controller.post_new_goals);

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