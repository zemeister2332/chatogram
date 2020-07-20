const cookieParser = require('cookie-parser');// find a working session store (have a look at the readme)
const passportSocketIo = require("passport.socketio");
const redisStore = require('../helpers/redisStore');


function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');
    accept(null, true);
}

function onAuthorizeFail(data, message, error, accept){
    if(error)
        throw new Error(message);
    console.log('failed connection to socket.io:', message);

    accept(null, false);
}

module.exports = passportSocketIo.authorize({
        cookieParser,       // the same middleware you registrer in express
        key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
        secret:       process.env["SESSION_SECRET_KEY"],    // the session_secret to parse the cookie
        store:        redisStore,        // we NEED to use a sessionstore. no memorystore please
        success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below

});

