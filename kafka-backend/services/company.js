const mongoose = require('mongoose');
const mongo = require('./dbconfig/connection');
var Students = require('./dbconfig/Models/StudentModel');
var Company = require('./dbconfig/Models/CompanyModel');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + msg.path);
    if (msg.path === "UpdateCompanyContactInfo") {
        Company.findOneAndUpdate({_id: msg.body.cid} , {"$set" : { 
            "email" :  msg.body.email,
            "mob" : msg.body.mob
         }},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null ,res);
        })
    } else if ( msg.path === "UpdateCompanyJourney" ){
        Company.findOneAndUpdate({_id: msg.body.cid} , {"$set" : { 
            "description" : msg.body.description
          }},{ new  : true}, (error,results)=>{
             res.value = (results);
             callback(null ,res);
         })
    } else if ( msg.path === "UpdateCompanyInfo" ){
        Company.findOneAndUpdate({_id: msg.body.cid} , {"$set" : { 
            "name" :  msg.body.name,
            "location" : msg.body.location
         }},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null ,res);
        })   
    } else if ( msg.path === "getCompanyDetails"){
        Company.findOne({_id : msg.body.cid}, (error , results) => {
            if (error) console.log(error)
            res.value = (results);
            callback(null ,res);
        })
    } else if ( msg.path === "company_profile_pic" ) {
        Company.findOneAndUpdate({_id : msg.body.cid},{"profile_pic" : msg.filepath},{new : true},(err,results) => {
            res.value = (results);
            callback(null ,res);
        })
    } 
}
exports.handle_request = handle_request;