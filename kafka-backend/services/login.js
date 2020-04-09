var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { secret } = require('./dbconfig/config');
var salt = bcrypt.genSaltSync(10);
const mongo = require('./dbconfig/connection');
var Students = require('./dbconfig/Models/StudentModel');
var Company = require('./dbconfig/Models/CompanyModel');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + msg.path);
    if (msg.path == "login") {
        console.log(msg.body);
        let table = null;
        // let type = null;
        console.log("Inside Login Post Request", msg);

        console.log("Req Body : ", msg.body.email);
        if (msg.body.company === false) {
            table = Students;
        }
        else {
            table = Company;
        }
        table.findOne({
            email: msg.body.email
        }, (error, results) => {
            if (results !== null) {
                if (bcrypt.compareSync(msg.body.password, results.password)) {
                    // res.cookie('cookie', msg.session.id, { maxAge: 900000, httpOnly: false, path: '/' });
                    let id = results._id;

                    const payload = { _id: id };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    res.status = 200;
                    res.value = "JWT " + token;
                    // res.status(200).send(String(id));
                } else {
                    res.status = 401;
                    res.value = "error";
                }
            } else {
                res.status = 401;
                res.value = "error";
            }
            callback(null, res)
        });
    } else if (msg.path == "company-signup") {
        console.log("In else if request:");
        Company.findOne({
            email: msg.body.email
        }, function (error, results) {
            if (results !== null) {
                res.value = "User Already Exists !!";
            }
            else {
                console.log("Called");
                var hash = bcrypt.hashSync(msg.body.password, salt);
                var newCompany = new Company({
                    cid: "",
                    name: msg.body.name,
                    email: msg.body.email,
                    password: hash,
                    description: "",
                    location: msg.body.location,
                    mob: null,
                    profile_pic: ""
                });


                if (newCompany.save()) {

                    console.log(results);
                    res.value = "Inserted";

                };
            }
            console.log(res)
            callback(null, res)
        });
    } else if (msg.path == "student-signup") {
        Students.findOne({
            email: msg.body.email
        }, function (error, results) {
            if (results !== null) {
                console.log("Called : " + JSON.stringify(msg.body));
                res.value = "User Already Exists !!";
            }
            else {
                console.log("Called : " + JSON.stringify(msg.body.college));

                var hash = bcrypt.hashSync(msg.body.password, salt);
                var newStudent = new Students({
                    sid: 3,
                    name: msg.body.name,
                    password: hash,
                    email: msg.body.email,
                    objective: "",
                    dob: "",
                    city: "",
                    state: "",
                    college: msg.body.college,
                    mob: "",
                    profile_pic: "",
                    education: [{
                        school_name: msg.body.college,
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
                    experience: []
                });
                console.log(newStudent)

                if (newStudent.save()) {
                    console.log(results);
                    res.value = "Inserted";
                }

            }
            callback(null,res);
        });
    }

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;