//Require Mongoose
var mongoose = require('mongoose');

var education = require('./EducationSchema');
var experience  = require('./ExperienceSchema');
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
  education: [ education ] ,
  skills: [{
      name: {type: String}
  }],
  experience : [ experience ]
},
{
    versionKey: false
}
);
const studentsModel = mongoose.model('students',studentsSchema);
module.exports = studentsModel;