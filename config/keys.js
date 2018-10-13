module.exports={
    session:
    {
        cookieKey:'thatisthecookiekey'
    },
    mongodb: 'mongodb+srv://tonoysh:12345@logincluster-gg7xg.gcp.mongodb.net/testdb?retryWrites=true'
}

/*
const cookieSession = require('cookie-session');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));
*/