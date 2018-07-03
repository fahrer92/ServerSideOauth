const passport = require('passport');

//google strategy has an interal identifier of 'google'
//Scope is request we make to googles server.

module.exports = (app) =>{
  app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
  }))

  //When a user visits this route passport will have the code
  app.get('/auth/google/callback', passport.authenticate('google'));

  //logout -> kill the cookie
  app.get('/api/logout', (req,res) =>{
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req,res)=>{
    res.send(req.user);
  })
}
