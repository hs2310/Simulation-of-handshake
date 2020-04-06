var express = require('express');
var app = express.Router();
const { checkStudentAuth } = require('../utils/passport');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const { auth } = require("../utils/passport");
auth();

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const Education = require('../Models/EducationSchema');

app.post('/student-signup',checkStudentAuth, function (req, res) {

    Students.findOne({
        email: req.body.email
    }, function (error, results) {
        if (results !== null) {
            console.log("Called : " + JSON.stringify(req.body) );
            res.send("User Already Exists !!");
        }
        else {
            console.log("Called : " + JSON.stringify(req.body.college) );

            var hash = bcrypt.hashSync(req.body.password, salt);
            var newStudent = new Students({
                sid: 3,
                name: req.body.name,
                password: hash,
                email: req.body.email,
                objective: "",
                dob: "",
                city: "",
                state: "",
                college: req.body.college,
                mob: "",
                profile_pic: "",
                education: [{  
                    school_name: req.body.college,
                    edu_level: "",
                    start: "",
                    end: "",
                    major: "",
                    minor: "",
                    gpa: "",
                    cgpa: "",
                    hide_gpa: "",
                    hide_cgpa: ""
                }],
                skills: [],
                experience : []
            });
            console.log(newStudent)

            newStudent.save((error, results) => {
                if (error) return console.log({ error: error });
                else {
                    console.log(results);
                    res.send("Inserted");
                }
            });
        }
    });
});

app.post('/company-signup', function (req, res) {
    
    Company.findOne({
        email: req.body.email
    }, function (error, results) {
        if (results !== null) {
            res.send("User Already Exists !!");
        }
        else {
            console.log("Called");
            var hash = bcrypt.hashSync(req.body.password, salt);
            var newCompany = new Company({
                cid: "",
                name: req.body.name,
                email: req.body.email,
                password: hash,
                description: req.body.location,
                location: "",
                mob: null,
                profile_pic: ""
            });


            newCompany.save((error, results) => {
                if (error) return console.log({ error: error });
                else {
                    console.log(results);
                    res.send("Inserted");
                }
            });
        }
    });
});

app.post('/login', function (req, res) {
    console.log(req.body);
    let table = null;
    // let type = null;
    console.log("Inside Login Post Request", req.body);

    console.log("Req Body : ", req.body.email);
    if (req.body.company === false){
        table = Students;
    }
    else{
        table = Company;
    }
    table.findOne({
        email: req.body.email
    }, (error, results) => {
        if (results !== null) {
            if (bcrypt.compareSync(req.body.password, results.password)) {
                // res.cookie('cookie', req.session.id, { maxAge: 900000, httpOnly: false, path: '/' });
                let id = results._id;                
                
                const payload = { _id: id};
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000
                });
                res.status(200).end("JWT " + token);
                // res.status(200).send(String(id));
            } else {
                res.status(401).send("error");
            }
        } else
            res.status(401).send("error");

    });
});

module.exports = app