//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var studentsSchema = new Schema({ 
  sid: {type: String},
  name : {type: String},
  email: {type: String},
  password: {type: String},
  objective: {type: String},
  dob:{type: String},
  city: {type: String},
  state: {type: String},
  college: {type: String},
  mob: {type: Number},
  profile_pic: {type: String},
  eductaion: [{
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
  }] ,
  skills: [{
      name: {type: String}
  }]
},
{
    versionKey: false
}
);
const studentsModel = mongoose.model('students',studentsSchema);
module.exports = studentsModel;