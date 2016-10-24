'use strict';
const person = require('./person');
const event = require('./event');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  mongoose.connect(process.env.MONGODB_URI || app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(event);
  app.configure(person);
};
