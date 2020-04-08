var express = require('express');
var app = express.Router();
const { checkStudentAuth } = require('../utils/passport');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const { auth } = require("../utils/passport");
var kafka = require('../kafka/client');
auth();

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const Education = require('../Models/EducationSchema');

app.post('/student-signup', function (req, res) {
    kafka.make_request('login', {"path" : "student-signup", "body" : req.body}, function (err, results) {
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
            res.end(results.value)
        }
    });
});

app.post('/company-signup', function (req, res) {
    kafka.make_request('login', {"path" : "company-signup", "body" : req.body}, function (err, results) {
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
            res.end(results.value)
        }
    });
    // Company.findOne({
    //     email: req.body.email
    // }, function (error, results) {
    //     if (results !== null) {
    //         res.send("User Already Exists !!");
    //     }
    //     else {
    //         console.log("Called");
    //         var hash = bcrypt.hashSync(req.body.password, salt);
    //         var newCompany = new Company({
    //             cid: "",
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: hash,
    //             description: req.body.location,
    //             location: "",
    //             mob: null,
    //             profile_pic: ""
    //         });


    //         newCompany.save((error, results) => {
    //             if (error) return console.log({ error: error });
    //             else {
    //                 console.log(results);
    //                 res.send("Inserted");
    //             }
    //         });
    //     }
    // });
});

app.post('/login', function (req, res) {
    kafka.make_request('login', {"path" : "login", "body" : req.body}, function (err, results) {
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
            res.status(results.status).send(results.value)
        }

    });
});

module.exports = app;