//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var companysSchema = new Schema({ 
  cid: {type: String},
  name : {type: String},
  email: {type: String},
  password: {type: String},
  description: {type: String},
  location: {type: String},
  mob: {type: Number},
  profile_pic: {type: String}  
},
{
    versionKey: false
}
);
const companyModel = mongoose.model('company',companysSchema,'company');
module.exports = companyModel;