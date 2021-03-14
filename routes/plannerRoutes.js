const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/plannerControllers');

// Template responses and post requests 

router.get("/", controller.landing_page); 

router.get("/planner", controller.goal_planner); 