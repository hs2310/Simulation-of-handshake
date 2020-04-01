var express = require('express')
var app = express.Router()
const multer = require('multer');
var path = require('path');

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');

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


app.post('/studentData', (req, res) => {
    Students.findOne({ _id: req.body.sid }, (error, results) => {
        res.send(results);
    })
})
app.post('/studentSkills', (req, res) => {
    Students.findOne({ _id: req.body.sid }, (error, results) => {
        res.send(results.skills);
    })
})
app.post('/getSkills', (req, res) => {
    Students.findOne({ _id: req.body.sid },{"skills" : 1}, (error, results) => {
        res.send(results.skills);
    })
});
app.post('/DeleteSkill', (req, res) => {
    console.log("Data : " + req.body.sid)
    Students.findOneAndUpdate({_id: req.body.sid} , {"$pull" : { "skills" : {"_id" : req.body.id}}},{ new  : true}, (error,results)=>{
        res.send(results);
    })
});

app.post('/UpdateSkill', (req, res) => {
    console.log("Data : " + req.body.sid)
    Students.findOneAndUpdate({_id: req.body.sid} , {"$push" : { "skills" : {"name" : req.body.name}}},{ new  : true}, (error,results)=>{
        res.send(results);
    })
});
app.post('/studentEducation', (req, res) => {
    Students.findOne({ _id: req.body.sid },{"education" : 1}, (error, results) => {
        res.send(results);
    })    
});

app.post('/insertEducation', (req, res) => {
    console.log(req.body);
    Students.findOneAndUpdate({_id: req.body.sid} , {"$push" : { "education" : {"school_name" : req.body.school_name, "edu_level" : req.body.edu_level, "start" : req.body.start, "end" : req.body.end, "major" : req.body.major, "minor" : req.body.minor, "gpa" : req.body.gpa, "cgpa" : req.body.cgpa, "hide_gpa" : req.body.hide_gpa, "hide_cgpa" : req.body.hide_cgpa }}},{ new  : true}, (error,results)=>{
        res.send(results);
    })    
})
app.post('/updateEducation', (req, res) => {
    Students.updateOne({ "_id": req.body.sid } , 
    { "$set" : 
        { 
            "education.$[element].school_name" : req.body.school_name,
            "education.$[element].edu_level" : req.body.edu_level, 
            "education.$[element].start" : req.body.start,
            "education.$[element].end" : req.body.end, 
            "education.$[element].major" : req.body.major, 
            "education.$[element].minor" : req.body.minor, 
            "education.$[element].gpa" : req.body.gpa, 
            "education.$[element].cgpa" : req.body.cgpa, 
            "education.$[element].hide_gpa" : req.body.hide_gpa, 
            "education.$[element].hide_cgpa" : req.body.hide_cgpa 
        }
    },
    {
        arrayFilters: [
            {"element._id" :req.body.id } 
        ]
    },
    (error,results)=>{
        res.send(results);
    })  
})
app.post('/deleteEducation', (req, res) => {
    console.log("Data : " + req.body.sid)
    Students.findOneAndUpdate({_id: req.body.sid} , {"$pull" : { "experience" : {"_id" : req.body.id}}},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})

app.post('/studentExperience', (req, res) => {
    Students.findOne({ _id: req.body.sid },{"experience" : 1}, (error, results) => {
        res.send(results);
    }) 
})
app.post('/insertExperience', (req, res) => {
    Students.findOneAndUpdate(
        { 
            _id: req.body.sid
        },
        {"$push" : 
            { "experience" : 
                {
                    "job_title" : req.body.job_title,
                    "employer" : req.body.employer, 
                    "start" : req.body.start, 
                    "end" : req.body.end,
                    "current_position" : req.body.current_position,
                    "location" : req.body.location, 
                    "description" : req.body.description
                }
            }
        },
        { new  : true}, (error,results)=>{
        res.send(results);
    })    
})
app.put('/updateExperience', (req, res) => {
    Students.updateOne({ "_id": req.body.sid } , 
    { "$set" : 
        { 
            "experience.$[element].job_title" : req.body.job_title,
            "experience.$[element].employer" : req.body.employer, 
            "experience.$[element].start" : req.body.start, 
            "experience.$[element].end" : req.body.end,
            "experience.$[element].current_position" : req.body.current_position,
            "experience.$[element].location" : req.body.location, 
            "experience.$[element].description" : req.body.description
        }
    },
    {
        arrayFilters: [
            {"element._id" :req.body.id } 
        ]
    },
    (error,results)=>{
        res.send(results);
    })  
})
app.post('/deleteExperience', (req, res) => {
    Students.findOneAndUpdate({_id: req.body.sid} , {"$pull" : { "experience" : {"_id" : req.body.id}}},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.post('/UpdateInfo', (req, res) => {
    Students.findOneAndUpdate({_id: req.body.sid} , {"$set" : { 
        "name" :  req.body.name,
        "college" : req.body.college,
        "dob" : req.body.dob
     }},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.post('/UpdateContactInfo', (req, res) => {
    Students.findOneAndUpdate({_id: req.body.sid} , {"$set" : { 
        "email" :  req.body.email,
        "mob" : req.body.mob
     }},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.post('/UpdateJourney', (req, res) => {
    Students.findOneAndUpdate({_id: req.body.sid} , {"$set" : { 
       "objective" : req.body.objective
     }},{ new  : true}, (error,results)=>{
        res.send(results);
    })
})
app.get('/getAllStudents', (req, res) => {
    Students.find({},(err,results) =>{
        res.send(results)
    })
})
app.post('/student_profile_pic', upload.single('file'), (req, res) => {    
    const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
    Students.findOneAndUpdate({_id : req.body.sid},{"profile_pic" : filepath},{new : true},(err,results) => res.send(results))
})

module.exports = app
