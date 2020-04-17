const mongoose = require('mongoose');
const mongo = require('./dbconfig/connection');
var Students = require('./dbconfig/Models/StudentModel');
var Company = require('./dbconfig/Models/CompanyModel');

var Events = require('./dbconfig/Models/EventsModel')
function handle_request(req, callback) {
    var res = {};
    console.log("In handle request:" + req.path);
    if (req.path === "getPostedEvents") {
        let pageNo = parseInt(req.body.pageNo);
        let limit = parseInt(req.body.limit);
    
        Events.find({cid : req.body.cid}).populate("applications.sid").limit(limit).skip((pageNo - 1)*limit).exec(( err , results ) => {
            res.value = (results);
            callback(null, res)
        })

    } else if (req.path === "postEvent") {
        newEvents = new Events({
            "cid" : req.body.cid,
            "name" : req.body.name,
            "description" : req.body.description,
            "time" : req.body.time,
            "date" : new Date(req.body.date),
            "location" : req.body.location,
            "eligibility" : req.body.eligibility
        });
        if(newEvents.save()){
            res.value = ("Inserted");
        callback(null, res)
        }
        
    } else if (req.path === "getEvents") {
        let limit = parseInt(req.body.limit)
        let pageNo = parseInt(req.body.pageNo)
        let condition = {};
        if(req.body.events)
        condition.name = { $regex: '.*' + req.body.events + '.*' }
        
        Events.find(condition).limit(limit).skip((pageNo - 1) * limit).sort('date').exec(( err , results ) => {
            console.log(results)
            res.value = (results);
            callback(null, res)
        })
    } else if (req.path === "registerEvent") {
        Events.findOne({ _id :req.body.eid },(err,results) => {
            flag = false;
            console.log("Data applications : " + results.applications)
            results.applications.forEach(element => {
                if(element.sid == req.body.sid)
                    flag = true
            });
            console.log("FLAG : " + flag)
            
            if(flag){
                res.value = ("Already Registered")
                callback(null, res)
            } else {
                Events.findOneAndUpdate({_id : req.body.eid},{ $push : { applications : { sid : req.body.sid}}},{ new :  true }, (err , results) => {                if(!err)
                    res.value = ("Applied")
                    callback(null, res)
                })
            }
            
        })
    } else if (req.path === "getAppliedEvents") {
        Events.find({ "applications.sid" : req.body.sid }, (err,results) => {
            res.value = (results)
            callback(null, res)
        })
    } else if (req.path === "getEventStudents") {
        Events.find({"_id" : req.body.eid},{"applications" : 1}).populate("applications.sid").exec((err,results) =>{ 
            res.value = (results) 
            callback(null,res)
        })
    } else if (req.path === "getMajor"){
        Students.findOne({_id: req.body.sid},(err,results) => {
              res.value = (results.education);
            callback(null , res)
        })
    }
}
exports.handle_request = handle_request;
