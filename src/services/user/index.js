'use strict';

const service = require('feathers-mongoose');
const user = require('./user-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: user,
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);

  user
    .findOne({ email : "admin@gaimed.com" })
    .then(item => {
        if(item === null) {
            userService
                .create({ type : "local", email : "admin@gaimed.com", password : "test" })
        }
        else {
            console.log("user already exists");
        }
    })
    .catch(err => console.log(err))
};
