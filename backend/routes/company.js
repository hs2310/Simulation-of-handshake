var express = require('express')
var app = express.Router()
const multer = require('multer');
var path = require('path');

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
    Company.findOneAndUpdate({_id: req.body.cid} , {"$set" : { 
        "email" :  req.body.email,
        "mob" : req.body.mob
     }},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.post('/UpdateCompanyJourney', (req, res) => {
    Company.findOneAndUpdate({_id: req.body.cid} , {"$set" : { 
        "description" : req.body.description
      }},{ new  : true}, (error,results)=>{
         res.send(results);
     })
})
app.post('/UpdateCompanyInfo', (req, res) => {
    Company.findOneAndUpdate({_id: req.body.cid} , {"$set" : { 
        "name" :  req.body.name,
        "location" : req.body.location
     }},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.post("/getCompanyDetails", (req, res) => {
    Company.findOne({_id : req.body.cid}, (error , results) => {
        res.send(results);
    })
})
app.post('/company_profile_pic', upload.single('file'), (req, res) => {    
    const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
    Company.findOneAndUpdate({_id : req.body.cid},{"profile_pic" : filepath},{new : true},(err,results) => res.send(results))
})

module.exports =  app;