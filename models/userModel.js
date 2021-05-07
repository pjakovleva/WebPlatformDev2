const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {ensureLoggedIn} = require('connect-ensure-login');

   class UserDAO {

       constructor(dbFilePath) {
           if (dbFilePath) {
               this.db = new Datastore({ filename: dbFilePath,
               autoload: true });
           } else {
             this.db = new Datastore();
           } 
       }

        create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var goal = {
               user: username,
               password: hash,
            };
            that.db.insert(goal, function (err) {
                if (err) {
                console.log('Unable to insert user into database: ', username);
        }
    }); });
}

        lookup(user, cb) {
            this.db.find({'user': user}, function (err, entries) {
                if (err) {
                    return cb(null, null);
                } else {
                    if (entries.length == 0) {
                        return cb(null, null);
                    }
                    return cb(null, entries[0]);
                }
            }); }
        }

const dao = new UserDAO('users.db');
module.exports = dao;