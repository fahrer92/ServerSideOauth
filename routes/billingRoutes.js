const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) =>{

//requireLogin is a reference to our middeleware function

app.post('/api/stripe', requireLogin, async(req,res)=>{
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    //using passport access current user and add credits
    req.user.credits +=5;
    const user = await req.user.save();


    //respond to browser
    res.send(user);

})


};
