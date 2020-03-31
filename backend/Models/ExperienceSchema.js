//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var experienceSchema = new Schema({

  job_title: {type: String},
    employer: {type: String},
    start: {type: String},
    end: {type: String},
    current_position: {type: String},
    location: {type: String},
    description : {type : String}

});
module.exports = experienceSchema;