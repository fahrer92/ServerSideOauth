const passport = require('passport');

//google strategy has an interal identifier of 'google'
//Scope is request we make to googles server.

module.exports = (app) =>{
  app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
  }))

  //When a user visits this route passport will have the code
  app.get('/auth/google/callback', passport.authenticate('google'));
}
