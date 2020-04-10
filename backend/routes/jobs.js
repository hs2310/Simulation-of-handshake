var express = require('express')
var app = express.Router()
var bodyParser = require('body-parser');
const multer = require('multer');
var path = require('path');

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');
const Jobs = require('../Models/JobsModel');

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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/postJob", (req, res) => {

    var newJob = new Jobs({
        "title": req.body.title,
        "posting_date": new Date(req.body.posting_date),
        "deadline": new Date(req.body.deadline),
        "location": req.body.location,
        "salary": req.body.salary,
        "job_description": req.body.job_description,
        "job_category": req.body.job_category,
        "cid": req.body.cid
    });
    newJob.save();
    res.send("inserted");
})

app.post('/getJobs', (req, res) => {
    let limit = parseInt(req.body.limit)
    let pageNo = parseInt(req.body.pageNo)
    let sort = req.body.sort
    console.log("======\nSort : " + JSON.stringify(sort))
    
    let condition = {};
        condition.title = {$regex : '.*' + req.body.title + '.*'}  
        condition.location = { $regex : '.*'+req.body.location+'.*'}
        if(req.body.filter.length > 0)
            condition.job_category = {$in : req.body.filter}
            try{
    Jobs.find(condition).limit(limit).skip((pageNo - 1) * limit).populate("cid").sort(sort).exec((err, results) => {
        if (err) res.send(err)
        res.send(results);
    })
    } catch (e){
        res.send(e)
    }
})

app.get('/getCompany', (req, res) => {
    Jobs.find({}).populate("cid").exec((err, results) => {
        if (err) res.send(err)
        res.send(results);
    })
})

app.post("/checkapplied", (req, res) => {

    Jobs.findOne({ _id: req.body.jid }, { applications: 1 },
        {
            arrayFilters: [
                { "element._id": req.body.sid }
            ]
        }, (err, results) => {
            if (err) res.send(err)
            else{
                if(results)
                    res.send(true)
                else    
                    res.send(false)
            }
        })
})
app.post('/applyJobs', upload.single('file'), function (req, res) {
    console.log(req.body)

    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    // req.body.studentId = 1
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.destination + req.file.filename;

    Jobs.findOneAndUpdate({ _id: req.body.jid }, { "$push": { "applications": { sid: req.body.sid, status: "PENDING", resume_url: imagepath } } }, { new: true }, (err, results) => {
        if (err) res.send(err)
        else
            res.send("Applied");
    })
});
app.post("/getApplication", (req, res) => {
    console.log("======\n"+req.body)
    let limit = parseInt(req.body.limit)
    let pageNo = parseInt(req.body.pageNo)
    let condition = null;
        if(req.body.filter !== ''){
           condition = {
                "applications.sid" : req.body.sid ,
                "applications.status" : req.body.filter
            };
        }else if (req.body.filter === '')
        {
            condition = {
                "applications.sid" : req.body.sid
            };
        }
    Jobs.find(condition,{applications : 1,title : 1}).limit(limit).skip((pageNo - 1) * limit).populate("cid").exec((err, results) => {
        if (err)
            res.send(err)
        else
            res.send(results);
    })
});
app.post("/getPostedJobs", (req, res) => {
    Jobs.find({ cid: req.body.cid }, (err, results) => {
        res.send(results);
    })
});
app.post("/getAllApplications", (req, res) => {
    Jobs.find({ _id: req.body.jid }, { applications: 1 }).populate("applications.sid").exec((err, results) => {
        res.send(results);
    })
})
app.post("/updateStatus", (req, res) => {
    Jobs.findOneAndUpdate({ "_id": req.body.jid },
        {
            "$set":
            {
                "applications.$[element].status": req.body.status
            }
        },
        {
            new: true,
            arrayFilters: [
                { "element.sid": req.body.sid }
            ]
        },
        (error, results) => {
            res.send(results);
        })
})



module.exports = app;