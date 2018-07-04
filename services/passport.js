const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//User object is model class.
const User = mongoose.model('users');


//user id is user model instance id from Mongo
//stuff it in a cookie
passport.serializeUser((user,done)=>{
  done(null, user.id);
});

//Get info from server using the id within the cookie.
passport.deserializeUser((id, done)=>{
  User.findById(id)
    .then(user =>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
  clientID:keys.googleClientID,
  clientSecret:keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile ,done)=>{

///Check if user already exists
  User.findOne({googleId: profile.id}).then(existingUser=>{

        if(existingUser){
          //we Already have a record
            done(null,existingUser);
        } else{
          //We don't have a user record with this id,
          //make a new record
            new User({ googleId:profile.id})
            .save()
            .then(user =>{ done(null,user)});
        }

      });
    }

  )
);
