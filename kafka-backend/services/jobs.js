const mongoose = require('mongoose');
const mongo = require('./dbconfig/connection');
var Students = require('./dbconfig/Models/StudentModel');
var Company = require('./dbconfig/Models/CompanyModel');
var Jobs = require('./dbconfig/Models/JobsModel');
function handle_request(req, callback) {
    var res = {};
    console.log("In handle request:" + req.path);
    if (req.path === "getJobs") {
        let limit = parseInt(req.body.limit)
        let pageNo = parseInt(req.body.pageNo)
        let sort = req.body.sort
        console.log("======\nSort : " + JSON.stringify(sort))

        let condition = {
            $or : [{title : {$regex: '.*'+req.body.title+'.*' }},{ name : {$regex: '.*'+req.body.title+'.*' }}]
        };
        condition.location = { $regex: '.*' + req.body.location + '.*' }
        //  {"cid.name" : { $regex: '.*' + req.body.location + '.*' }}
        if (req.body.filter.length > 0)
            condition.job_category = { $in: req.body.filter }
        Jobs.find(condition).limit(limit).skip((pageNo - 1) * limit).populate("cid").sort(sort).exec((err, results) => {
            // if (err) res.value =(err)
            
            res.value = (results);
            callback(null, res)
        })

    } else if (req.path === "checkapplied") {
        Jobs.findOne({ _id: req.body.jid }, { applications: 1 },
            {
                arrayFilters: [
                    { "element._id": req.body.sid }
                ]
            }, (err, results) => {
                if (err) res.value = (err)
                else {
                    if (results)
                        res.value = (true)
                    else
                        res.value = (false)
                }
                callback(null, res);
            })
    } else if (req.path === "applyJobs") {
        Jobs.findOneAndUpdate({ _id: req.body.jid }, { "$push": { "applications": { sid: req.body.sid, status: "PENDING", resume_url: req.imagepath } } }, { new: true }, (err, results) => {
            if (err) res.value = (err)
            else
                res.value = ("Applied");
            callback(null, res)
        })
    } else if (req.path === "getApplication") {
        let limit = parseInt(req.body.limit)
        let pageNo = parseInt(req.body.pageNo)
        let condition = null;
        if (req.body.filter !== '') {
            condition = {
                "applications.sid": req.body.sid,
                "applications.status": req.body.filter
            };
        } else if (req.body.filter === '') {
            condition = {
                "applications.sid": req.body.sid
            };
        }
        Jobs.find(condition).limit(limit).skip((pageNo - 1) * limit).populate("cid").exec((err, results) => {
            if (err)
                res.value = (err)
            else
                res.value = (results);
            callback(null, res);
        })
    } else if (req.path === "postJob") {
        let limit = parseInt(req.body.limit);
        let pageNo = parseInt(req.body.pageNo);

        var newJob = new Jobs({
            "title": req.body.title,
            "posting_date": req.body.posting_date,
            "deadline": req.body.deadline,
            "location": req.body.location,
            "salary": req.body.salary,
            "job_description": req.body.job_description,
            "job_category": req.body.job_category,
            "name" : req.body.name,
            "cid": req.body.cid
        });

        newJob.save((err, results) => {
            Jobs.find({ cid: req.body.cid }).limit(limit).skip((pageNo - 1) * limit).exec((err, results) => {
                res.value = (results)
                callback(null, res)
            });
        });
    } else if (req.path === "getPostedJobs") {
        let limit = parseInt(req.body.limit);
        let pageNo = parseInt(req.body.pageNo);
        Jobs.find({ cid: req.body.cid }).limit(limit).skip((pageNo - 1) * limit).populate("applications.sid").exec((err, results) => {
            res.value = (results);
            callback(null,res)
        })
    } else if (req.path === "getAllApplications"){
        let limit = parseInt(req.body.limit);
        let pageNo = parseInt(req.body.pageNo);
        Jobs.find({ _id: req.body.jid }).populate("applications.sid").limit(limit).skip((pageNo - 1) * limit).exec((err, results) => {
            res.value = (results);
            callback(null , res)
        })
    } else if( req.path === "updateStatus"){
        Jobs.findOneAndUpdate({ "_id": req.body.jid },
        {
            $set:
            {
                "applications.$[element].status": req.body.status
            }
        },
        {
            arrayFilters: [
                { "element.sid": req.body.sid }
            ]
        },
        (err, results) => {
            // Jobs.findOne({ _id : req.body.sid}, (err,result) => {
                if(err) res.value = (err)
                else
                res.value = (results);
            // })
            callback(null,res)
        })
    
    }
}
exports.handle_request = handle_request;
