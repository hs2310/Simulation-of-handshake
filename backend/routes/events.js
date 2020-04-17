var express = require('express')
var app = express.Router()
var kafka = require('../kafka/client')
const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const Events = require('../Models/EventsModel');

app.post('/getPostedEvents', (req, res) => {
    kafka.make_request('event', {"path" : "getPostedEvents", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post("/postEvent", (req, res) => {
    kafka.make_request('event', {"path" : "postEvent", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post('/getEvents', (req, res) => {
    console.log("=====\n Events Called \n=====")
    kafka.make_request('event', {"path" : "getEvents", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post("/registerEvent", (req, res) => {
    kafka.make_request('event', {"path" : "registerEvent", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post("/getAppliedEvents", (req, res) => {
    kafka.make_request('event', {"path" : "getAppliedEvents", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post("/getEventStudents", (req, res) => {
    kafka.make_request('event', {"path" : "getEventStudents", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
app.post("/getMajor" , (req,res) => {
    kafka.make_request('event', {"path" : "getMajor", "body" : req.body}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.send(results.value)
        }
    });
})
module.exports = app;