'use strict';

// evenement-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  dates: [{
      date : { type: Date, required: true },
      times : [
        { type: String, required: true },
      ]
  }],
  description: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;
