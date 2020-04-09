var express = require('express')
var app = express.Router()
const multer = require('multer');
var path = require('path');
var kafka = require('../kafka/client');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');

app.post('/UpdateCompanyContactInfo', (req, res) => {
    kafka.make_request('company', {"path" : "UpdateCompanyContactInfo", "body" : req.body}, function (err, results) {
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
    // Company.findOneAndUpdate({_id: req.body.cid} , {"$set" : { 
    //     "email" :  req.body.email,
    //     "mob" : req.body.mob
    //  }},{ new  : true}, (error,results)=>{
    //     res.send(results);
    // })
})
app.post('/UpdateCompanyJourney', (req, res) => {
    kafka.make_request('company', {"path" : "UpdateCompanyJourney", "body" : req.body}, function (err, results) {
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
app.post('/UpdateCompanyInfo', (req, res) => {
    kafka.make_request('company', {"path" : "UpdateCompanyInfo", "body" : req.body}, function (err, results) {
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
app.post("/getCompanyDetails", (req, res) => {
    kafka.make_request('company', {"path" : "getCompanyDetails", "body" : req.body}, function (err, results) {
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
app.post('/company_profile_pic', upload.single('file'), (req, res) => {    
    const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
    kafka.make_request('company', {"path" : "company_profile_pic", "body" : req.body , "filepath" : filepath}, function (err, results) {
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

module.exports =  app;