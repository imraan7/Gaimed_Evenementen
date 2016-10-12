'use strict';

const service = require('feathers-mongoose');
const person = require('./person-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: person,
  };

  // Initialize our service with any options it requires
  app.use('/people', service(options));

  // Get our initialize service to that we can bind hooks
  const personService = app.service('/people');

  // Set up our before hooks
  personService.before(hooks.before);

  // Set up our after hooks
  personService.after(hooks.after);
};
