const express = require('express');
const router = require('./routes/calendarRoutes.js');
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
// instructing the application to use sessions
const session = require('express-session');
const auth = require('./auth/auth.js');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 9000);

const public = path.join(__dirname, 'public');
app.use(express.static('public'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended: false}));

// signing the session id 
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
// preventing empty session objects from being stored in the database
app.use(passport.initialize());
app.use(passport.session());

auth.init(app);

app.use('/', router);

app.listen(3000, () => {
    console.log('Server started, Ctl^C to quit');
});