
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../model/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {            
            done(err, user);
        });
    });
    
    //------------------------ local ---------------------//
    //----------------------- singn-in ---------------------//
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupError', 'That email is already taken.'));
                    } else {
                        var newUser = new User();

                        newUser.local.name = req.body.name;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    //------------------------login-------------------//
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
        function (req, email, password, done) {

            User.findOne({'local.email':email},function(err,user){
                if(err)
                    return done(err);
                if(!user)
                    return done(null,false,req.flash('loginError','User not found'));
                if(!user.validPassword(password))
                    return done(null,false,req.flash('loginError','User not found'));
                return done(null,user);
            });
        }));

};