//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MessageSchema = new Schema({ 
  users : [{type : String}],
  name : [{type : String}],
  messages : [{msg : {type :String},timestamp : {type : Date } , sentBy : {type : String}}]
},
{ 
    versionKey: false
}
);
const messagesModel = mongoose.model('messages', MessageSchema );
module.exports = messagesModel;