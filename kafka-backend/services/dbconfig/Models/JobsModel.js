//Require Mongoose
var mongoose = require('mongoose');

var Student = require('./StudentModel');
var Company = require('./CompanyModel');
//Define a schema
var Schema = mongoose.Schema;

var jobSchema = new Schema({ 
  title: {type: String},
  posting_date: {type: String},
  deadline: {type: String},
  location: {type: String},
  salary: {type: String},
  job_description:{type: String},
  job_category: {type: String},
  cid: {type : Schema.ObjectId , ref : Company },
  applications : [{
      sid : {type : Schema.ObjectId , ref : Student},
      status : {type : String},
      resume_url : {type : String}
  }]
},
{
    versionKey: false
}
);
const jobsModel = mongoose.model('jobs', jobSchema , 'jobs');
module.exports = jobsModel;