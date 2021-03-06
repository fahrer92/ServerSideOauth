const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)

const app = express();


///Express Middlewares denoted as app.use
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//If in production
if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  //Make sure Express will serve up production assets
  //Like main.js file or main.class
  app.use(express.static('client/build'));
  //Express will serve Index.html file if it doesnt
  //recognise the route

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
