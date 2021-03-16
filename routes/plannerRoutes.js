const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/plannerControllers');

// Template responses and post requests 

router.get("/", controller.landing_page); 

router.get("/planner", controller.goal_planner); 

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