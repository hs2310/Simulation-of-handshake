var express = require('express')
var app = express.Router()
const multer = require('multer');
var path = require('path');
var kafka = require('../kafka/client');

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
    kafka.make_request('student', {"path" : "studentData", "body" : req.body}, function (err, results) {
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
// app.post('/studentSkills', (req, res) => {
//     kafka.make_request('student', {"path" : "studentSkills", "body" : req.body}, function (err, results) {
//         console.log('in result');
//         console.log(results);
//         if (err) {
//             console.log("Inside err");
//             res.json({
//                 status: "error",
//                 msg: "System Error, Try Again."
//             })
//         } else {
//             console.log("Inside else");
//             res.send(results.value)
//         }
//     });

//     // Students.findOne({ _id: req.body.sid }, (error, results) => {
//     //     res.send(results.skills);
//     // })
// })
// app.post('/getSkills', (req, res) => {
//     Students.findOne({ _id: req.body.sid },{"skills" : 1}, (error, results) => {
//         res.send(results.skills);
//     })
// });
app.post('/DeleteSkill', (req, res) => {
    kafka.make_request('student', {"path" : "DeleteSkill", "body" : req.body}, function (err, results) {
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
    // console.log("Data : " + req.body)
    // Students.findOneAndUpdate({_id: req.body.sid} , {"$pull" : { "skills" : {"_id" : req.body.id}}},{ new  : true}, (error,results)=>{
    //     res.send(results);
    // })
});

app.post('/UpdateSkill', (req, res) => {
    kafka.make_request('student', {"path" : "UpdateSkill", "body" : req.body}, function (err, results) {
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
    // console.log("Data : " + req.body.sid)
    // Students.findOneAndUpdate({_id: req.body.sid} , {"$push" : { "skills" : {"name" : req.body.name}}},{ new  : true}, (error,results)=>{
    //     res.send(results);
    // })
});
app.post('/studentEducation', (req, res) => {
    Students.findOne({ _id: req.body.sid },{"education" : 1}, (error, results) => {
        res.send(results);
    })    
});

app.post('/insertEducation', (req, res) => {
    kafka.make_request('student', {"path" : "insertEducation", "body" : req.body}, function (err, results) {
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

    // console.log(req.body);
    // Students.findOneAndUpdate({_id: req.body.sid} , 
    //     {"$push" : { "education" : {"school_name" : req.body.school_name, "edu_level" : req.body.edu_level, "start" : req.body.start, "end" : req.body.end, "major" : req.body.major, "minor" : req.body.minor, "gpa" : req.body.gpa, "cgpa" : req.body.cgpa, "hide_gpa" : req.body.hide_gpa, "hide_cgpa" : req.body.hide_cgpa }}},
    //     { new  : true}, (error,results)=>{
    //     res.send(results);
    // })    
})
app.post('/updateEducation', (req, res) => {
    kafka.make_request('student', {"path" : "updateEducation", "body" : req.body}, function (err, results) {
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
app.post('/deleteEducation', (req, res) => {
    kafka.make_request('student', {"path" : "deleteEducation", "body" : req.body}, function (err, results) {
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

app.post('/studentExperience', (req, res) => {
    Students.findOne({ _id: req.body.sid },{"experience" : 1}, (error, results) => {
        res.send(results);
    }) 
})
app.post('/insertExperience', (req, res) => {
    kafka.make_request('student', {"path" : "insertExperience", "body" : req.body}, function (err, results) {
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
app.post('/updateExperience', (req, res) => {
    kafka.make_request('student', {"path" : "updateExperience", "body" : req.body}, function (err, results) {
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
app.post('/deleteExperience', (req, res) => {
    kafka.make_request('student', {"path" : "deleteExperience", "body" : req.body}, function (err, results) {
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
app.post('/UpdateInfo', (req, res) => {
    kafka.make_request('student', {"path" : "UpdateInfo", "body" : req.body}, function (err, results) {
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
app.post('/UpdateContactInfo', (req, res) => {
    kafka.make_request('student', {"path" : "UpdateContactInfo", "body" : req.body}, function (err, results) {
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
app.post('/UpdateJourney', (req, res) => {
    kafka.make_request('student', {"path" : "UpdateJourney", "body" : req.body}, function (err, results) {
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
app.post('/getAllStudents', (req, res) => {
    kafka.make_request('student', {"path" : "getAllStudents", "body" : req.body}, function (err, results) {
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
app.post('/student_profile_pic', upload.single('file'), (req, res) => {    
    
    const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
    kafka.make_request('student', {"path" : "student_profile_pic", "body" : req.body , "filepath" : filepath}, function (err, results) {
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

module.exports = app
