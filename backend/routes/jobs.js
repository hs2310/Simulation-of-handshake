var express = require('express')
var app = express.Router()
var bodyParser = require('body-parser');
const multer = require('multer');
var path = require('path');
var kafka = require('../kafka/client');

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
    kafka.make_request('job', { "path": "postJob", "body": req.body }, function (err, results) {
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

app.post('/getJobs', (req, res) => {
    kafka.make_request('job', { "path": "getJobs", "body": req.body }, function (err, results) {
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

app.get('/getCompany', (req, res) => {
    Jobs.find({}).populate("cid").exec((err, results) => {
        if (err) res.send(err)
        res.send(results);
    })
})

app.post("/checkapplied", (req, res) => {
    kafka.make_request('job', { "path": "checkapplied", "body": req.body }, function (err, results) {
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
app.post('/applyJobs', upload.single('file'), function (req, res) {
    console.log(req.body)

    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    // req.body.studentId = 1
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.destination + req.file.filename;
    kafka.make_request('job', { "path": "applyJobs", "body": req.body, "imagepath": imagepath }, function (err, results) {
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

});
app.post("/getApplication", (req, res) => {
    kafka.make_request('job', { "path": "getApplication", "body": req.body }, function (err, results) {
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
});
app.post("/getPostedJobs", (req, res) => {
    kafka.make_request('job', { "path": "getPostedJobs", "body": req.body }, function (err, results) {
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
 
    
});
app.post("/getAllApplications", (req, res) => {
    kafka.make_request('job', { "path": "getAllApplications", "body": req.body }, function (err, results) {
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
app.post("/updateStatus", (req, res) => {
    kafka.make_request('job', { "path": "updateStatus", "body": req.body }, function (err, results) {
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



module.exports = app;