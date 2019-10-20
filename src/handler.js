let jwt = require('jsonwebtoken');

let config = require('../conf/conf');

class RequestHandler {

    login (req, h) {
      let username = req.query.username;
      let password = req.query.password;
      // For the given username fetch user from DB
      let mockedUsername = 'admin';
      let mockedPassword = 'password';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          h.state('accinfo', JSON.stringify({username:req.query.username,token:token}));
          return h.response({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
          
        } else {
          return h.response({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        return h.response({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }  
}

module.exports = RequestHandler;
  