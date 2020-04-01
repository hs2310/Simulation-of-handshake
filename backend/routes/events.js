var express = require('express')
var app = express.Router()

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const Events = require('../Models/EventsModel');

app.post('/getPostedEvents', (req, res) => {
    Events.find({cid : req.body.cid}, ( err , results ) => {
        res.send(results)
    })
})
app.post("/postEvent", (req, res) => {
    newEvents = new Events({
        "cid" : req.body.cid,
        "name" : req.body.name,
        "description" : req.body.description,
        "time" : req.body.time,
        "date" : req.body.date,
        "location" : req.body.location,
        "eligibility" : req.body.eligibility
    });
    if(newEvents.save())
        res.send("Inserted");
    else
        res.send("Error")    
})
app.post('/getEvents', (req, res) => {
    Events.find({}, ( err , results ) => {
        res.send(results)
    })
})
app.post("/registerEvent", (req, res) => {
    Events.findOne({ _id :req.body.eid },(err,results) => {
        flag = false;
        console.log("Data applications : " + results.applications)
        results.applications.forEach(element => {
            if(element.sid == req.body.sid)
                flag = true
        });
        console.log("FLAG : " + flag)
        
        if(flag){
            res.send("Already Registered")
        } else {
            Events.findOneAndUpdate({_id : req.body.eid},{ $push : { applications : { sid : req.body.sid}}},{ new :  true }, (err , results) => {                if(!err)
                res.send("Applied")
            })
        }
    })
})
app.post("/getAppliedEvents", (req, res) => {
    Events.find({ "applications.sid" : req.body.sid }, (err,results) => {
        res.send(results)
    })
})
app.post("/getEventStudents", (req, res) => {
    Events.find({"_id" : req.body.eid},{"applications" : 1}).populate("applications.sid").exec((err,results) => res.send(results))
})
module.exports = app;