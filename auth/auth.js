const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');

// implementing an authentication strategy using a username and password
exports.init = function(app) {

    // setting up the authentication details
    passport.use(new Strategy(
        function(username, password, cb) { 
            userModel.lookup(username, function(err, user) {
            // comparing the provided username with existing users
                if (err) {
                    console.log('Error finding user', err);
                    return cb(err);
                } if (!user) {
                    console.log('User ', username, ' not found');
                    return cb(null, false);
                }

                // comparing the provided password with existing password 
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        cb(null, user);
                    } else {
                        cb(null, false);
} });
}); }));

    // serializing and deserializing users
    passport.serializeUser(function(user, cb) {
        cb(null, user.user);
    });
    passport.deserializeUser(function(id, cb) {
        userModel.lookup(id, function(err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    }); 

    app.use(passport.initialize());
    app.use(passport.session());
};

exports.authorize = function(redirect) {
    return passport.authenticate('local', { failureRedirect: redirect });
};