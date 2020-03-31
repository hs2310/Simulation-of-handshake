//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var educationSchema = new Schema({

  school_name: {type: String},
    edu_level: {type: String},
    start: {type: String},
    end: {type: String},
    major: {type: String},
    minor: {type: String},
    gpa: {type: String},
    cgpa: {type: String},
    hide_gpa: {type: String},
    hide_cgpa: {type: String}

});
module.exports = educationSchema;