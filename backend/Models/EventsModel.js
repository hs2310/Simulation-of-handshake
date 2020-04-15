//Require Mongoose
var mongoose = require('mongoose');

var Company = require('./CompanyModel');
var Student = require('./StudentModel');

//Define a schema
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    cid: { type: Schema.ObjectId, ref: Company },
    applications: [{ sid: { type: Schema.ObjectId, ref: Student } }],
    name: { type: String },
    description: { type: String },
    time: { type: String },
    date: { type: Date },
    location: { type: String },
    eligibility: { type: String }
    },
    {
        versionKey: false
    }
);
const eventsModel = mongoose.model('events', eventsSchema, 'events');
module.exports = eventsModel;