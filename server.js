const express       = require('express');
const app           = express();
const port          = process.env.PORT || 3000;
const mongoose      = require('mongoose');
const passport      = require('passport');
const bodyParser    = require('body-parser');

const morgan        = require('morgan');
const cookieSession = require('cookie-session');
const flash         = require('connect-flash');
const keys          = require('./config/keys');


//---------------------configs---------------------//


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

//template engine
app.set('view engine','ejs');

//Database connection
mongoose.connect(keys.mongodb,{useNewUrlParser:true}, function(err){
    if(err)
        console.log("Connection error "+err);
    else
        console.log("Database is connected");
});


//passport initialization
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//-----------------routes-------------------//
//home route
require('./routes/homeRoute')(app);
//auth routes
require('./routes/auth-routes')(app,passport);



//listening port
app.listen(port,function(){
  console.log('Listening to the port: '+port);
})