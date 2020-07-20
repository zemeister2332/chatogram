const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const User = require('../models/users');

passport.use(new GoogleStrategy({
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: process.env["GOOGLE_LOGIN_CALLBACK_URL"]
    }, ((accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        //console.log(data.sub);

        User.findOrCreate({
            'googleId': data.sub
        }, {
            name: data.given_name,
            surname: data.family_name,
            profilePhotoUrl: data.picture
        },(err,user) => {
            return done(err,user);
        })
    }
)));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
module.exports = passport;

