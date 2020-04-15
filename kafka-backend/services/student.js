const mongoose = require('mongoose');
const mongo = require('./dbconfig/connection');
var Students = require('./dbconfig/Models/StudentModel');
var Company = require('./dbconfig/Models/CompanyModel');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + msg.path);
    if (msg.path === "studentData") {
        Students.findOne({ _id: msg.body.sid }, (error, results) => {
            console.log(results)
            res.value = results;
            callback(null, res)
        })

    } else if (msg.path === "DeleteSkill") {
        Students.findOneAndUpdate({ _id: msg.body.sid }, { "$pull": { "skills": { "_id": msg.body.id } } }, { new: true }, (error, results) => {
            res.value = results;
            callback(null, res)
        })
    } else if (msg.path === "UpdateSkill") {
        Students.findOneAndUpdate({ _id: msg.body.sid }, { "$push": { "skills": { "name": msg.body.name } } }, { new: true }, (error, results) => {
            res.value = results;
            callback(null, res)
        })
    } else if (msg.path === "insertEducation") {
        Students.findOneAndUpdate({ _id: msg.body.sid },
            {
                "$push":
                {
                    "education": {
                        "school_name": msg.body.school_name,
                        "edu_level": msg.body.edu_level,
                        "start": msg.body.start,
                        "end": msg.body.end,
                        "major": msg.body.major,
                        "minor": msg.body.minor,
                        "gpa": msg.body.gpa,
                        "cgpa": msg.body.cgpa,
                        "hide_gpa": msg.body.hide_gpa,
                        "hide_cgpa": msg.body.hide_cgpa
                    }
                }
            },
            { new: true }, (error, results) => {
                if (error) console.log(error)
                res.value = (results);
                callback(null, res)
            })
    } else if (msg.path === "updateEducation") {
        Students.findOneAndUpdate({ "_id": msg.body.sid },
            {
                "$set":
                {
                    "education.$[element].school_name": msg.body.school_name,
                    "education.$[element].edu_level": msg.body.edu_level,
                    "education.$[element].start": msg.body.start,
                    "education.$[element].end": msg.body.end,
                    "education.$[element].major": msg.body.major,
                    "education.$[element].minor": msg.body.minor,
                    "education.$[element].gpa": msg.body.gpa,
                    "education.$[element].cgpa": msg.body.cgpa,
                    "education.$[element].hide_gpa": msg.body.hide_gpa,
                    "education.$[element].hide_cgpa": msg.body.hide_cgpa
                }
            },
            {
                arrayFilters: [
                    { "element._id": msg.body.id }
                ],
                new: true
            },
            (error, results) => {
                if (error) console.log(error)
                res.value = (results);
                callback(null, res)
            })
    } else if (msg.path === "deleteEducation") {
        Students.findOneAndUpdate({ _id: msg.body.sid }, { "$pull": { "education": { "_id": msg.body.id } } }, { new: true }, (error, results) => {
            res.value = (results);
            callback(null, res);
        })
    } else if (msg.path === "insertExperience") {
        Students.findOneAndUpdate({ _id: msg.body.sid },
            {
                "$push":
                {
                    "experience":
                    {
                        "job_title": msg.body.job_title,
                        "employer": msg.body.employer,
                        "start": msg.body.start,
                        "end": msg.body.end,
                        "current_position": msg.body.current_position,
                        "location": msg.body.location,
                        "description": msg.body.description
                    }
                }
            },
            { new: true }, (error, results) => {
                res.value = (results);
                callback(null, res);
            })
    } else if (msg.path === "updateExperience") {
        Students.findOneAndUpdate({ "_id": msg.body.sid },
            {
                "$set":
                {
                    "experience.$[element].job_title": msg.body.job_title,
                    "experience.$[element].employer": msg.body.employer,
                    "experience.$[element].start": msg.body.start,
                    "experience.$[element].end": msg.body.end,
                    "experience.$[element].current_position": msg.body.current_position,
                    "experience.$[element].location": msg.body.location,
                    "experience.$[element].description": msg.body.description
                }
            },
            {
                arrayFilters: [
                    { "element._id": msg.body.id }
                ],
                new: true
            },
            (error, results) => {
                if(error) console.log(error)
                res.value = (results);
                callback(null, res);
            })
    } else if (msg.path === "deleteExperience"){
        Students.findOneAndUpdate({_id: msg.body.sid} , {"$pull" : { "experience" : {"_id" : msg.body.id}}},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null, res);
        })
    } else if (msg.path === "UpdateInfo"){ 
        Students.findOneAndUpdate({_id: msg.body.sid} , {"$set" : { 
            "name" :  msg.body.name,
            "college" : msg.body.college,
            "dob" : msg.body.dob
         }},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null, res);
        })
    } else if (msg.path === "UpdateJourney"){
        Students.findOneAndUpdate({_id: msg.body.sid} , {"$set" : { 
            "objective" : msg.body.objective
          }},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null, res);
         })
    } else if (msg.path === "UpdateContactInfo"){
        Students.findOneAndUpdate({_id: msg.body.sid} , {"$set" : { 
            "email" :  msg.body.email,
            "mob" : msg.body.mob
         }},{ new  : true}, (error,results)=>{
            res.value = (results);
            callback(null, res);
        })
    } else if ( msg.path === "student_profile_pic" ){
        console.log("msg : "+msg)
        Students.findOneAndUpdate({_id : msg.body.sid},{"profile_pic" : msg.filepath},{new : true},(err,results) => {
            res.value = (results);
            callback(null, res);
        })
    } else if ( msg.path === "getAllStudents" ){
        console.log("msg : "+msg)
        let pageNo = parseInt(msg.body.pageNo)
        let limit = parseInt(msg.body.limit)
        let condition = {}
        if(msg.body.filter !== "")
            condition = { $or :[
                {"skills.name" : { $regex : '.*' +msg.body.filter+'.*'}},
                {"name" :  {$regex : '.*' +msg.body.filter+'.*'}},
                {"college" : {$regex : '.*' +msg.body.filter+'.*'}}
            ]
            }
        console.log("condition : " + JSON.stringify(condition))
        Students.find(condition).limit(limit).skip((pageNo - 1)*limit).exec((err,results) =>{
            res.value = (results);
            callback(null, res);
        })
        // Students.find({}).exec((err,results) =>{
        //     res.value = (results);
        //     callback(null, res);
        // })
    }

}
exports.handle_request = handle_request;