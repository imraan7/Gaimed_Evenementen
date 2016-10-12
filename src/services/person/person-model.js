'use strict';

// employee-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    type: {
        type: String,
        required : true,
        enum : ['employee', 'citizen']
    },
    firstname: { type: String, required: true },
    lastname: { type: String },
    telephone: { type: String },
    email: { type: String },
    department: { type: String },
    event: {
		type: Schema.Types.ObjectId,
        ref : "event",
		required: true
	},
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
});

const personModel = mongoose.model('person', personSchema);

module.exports = personModel;
