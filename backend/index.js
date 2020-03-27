//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer = require('multer');
var path = require('path');




//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

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

const mongoose = require('mongoose');


const mongo = require("./connection");

//Routes

var auth = require("./routes/auth");
var students =  require("./routes/student");
app.use("/",auth);  
app.use("/students", students);


// app.get('/getJobs', (req, res) => {
//     // console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('SELECT `job_list`.* , `company`.* FROM `job_list` INNER JOIN  `company` ON (`job_list`.cid = `company`.cid )');

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error;
//         }
//         else {
//             // console.log(results)
//             return results;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.get('/getCompany', (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.execute('SELECT `job_list`.* , `company`.* FROM `job_list` INNER JOIN  `company` ON (`job_list`.cid = `company`.cid )');

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error){ 
//         //     return error
//         // }
//         // else {
//         //     // console.log(results)
//         //     return "Updated";
//         // }
//         return rows;
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r.data);
//         // console.log(r);
//     })
// })
// app.post("/getCompanyDetails", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT * FROM `company` WHERE cid = ?', [req.body.cid]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error){ 
//         //     return error
//         // }
//         // else {
//         // console.log(results)
//         return rows;
//         // }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         console.log(r);
//     })
// })
// //start your server on port 3001
// app.post("/checkapplied", (req, res) => {
//     async function updateInfo() {
//         console.log(req.body)
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, field] = await conn.query('SELECT * FROM job_applied WHERE jid = ? AND sid = ?', [req.body.jid, req.body.sid])
//         await conn.end();
//         if (rows.length > 0)
//             return false
//         else
//             return true
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         console.log(r);
//     })
// })
// app.post('/applyJobs', upload.single('file'), function (req, res) {
//     // console.log(req)
//     async function updateInfo() {
//         var host = req.hostname;
//         console.log("Hostname", host)
//         console.log("File", req.file)
//         // req.body.studentId = 1
//         var imagepath = req.protocol + "://" + host + ':3001/' + req.file.destination + req.file.filename;
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });

//         // upload.single('file');
//         const [error, results] = await conn.query('INSERT INTO `job_applied` (`jid`,`sid`,`status`,`resume_url`) VALUES(?,?,?,?)', [req.body.jid, req.body.sid, "PENDING", imagepath]);
//         await conn.end();
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Applied";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         console.log(r);
//     })
// });
// app.post("/getApplicaion", (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT job_applied.*, job_list.title, company.name FROM `job_applied` INNER JOIN `job_list` ON (`job_applied`.`jid` = `job_list`.`jid`) INNER JOIN `company` ON (`job_list`.cid = `company`.cid) WHERE `job_applied`.sid = ?', [req.body.sid]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error){ 
//         //     return error
//         // }
//         // else {
//         // console.log(results)
//         return rows;
//         // }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         console.log(r);
//     })
// })
// app.get('/getAllStudents', (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.execute('SELECT * FROM `students`');

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error){ 
//         //     return error
//         // }
//         // else {
//         //     // console.log(results)
//         //     return "Updated";
//         // }
//         return rows;
//     }

//     data = updateInfo()
//     data.then((r) => {

//         res.send(r);
//     })
// })
// app.post('/UpdateCompanyContactInfo', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.execute('UPDATE `company` SET mob = ? , email = ? WHERE cid = ?;', [req.body.mob, req.body.email, Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/UpdateCompanyJourney', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.execute('UPDATE `company` SET description = ? WHERE cid = ?;', [req.body.objective, Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return results;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         console.log(r);
//     })
// })
// app.post('/UpdateCompanyInfo', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('UPDATE `company` SET name = ? , location = ? WHERE cid = ?;', [req.body.name, req.body.college, req.body.dob, Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/getPostedJobs", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('SELECT * FROM `job_list` WHERE cid = ?;', [Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/postJob", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('INSERT INTO `job_list` (`title`, `posting_date`, `deadline`, `location`, `salary`, `job_description`, `job_category`, `cid`) VALUES (?,?,?,?,?,?,?,?);', [req.body.title, req.body.posting_date, req.body.deadline, req.body.location, req.body.salary, req.body.job_description, req.body.job_category, Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/getAllApplications", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('SELECT `students`.* , `job_applied`.`jid`,`job_applied`.`status`,`job_applied`.`resume_url` FROM `students` INNER JOIN `job_applied` ON (`students`.`sid` = `job_applied`.`sid` AND `job_applied`.`jid` = ?)', [Number(req.body.jid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return rows;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/updateStatus", (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('UPDATE `job_applied` SET status = ? WHERE jid = ? AND sid = ?;', [req.body.status, req.body.jid, req.body.sid]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return results;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/getPostedEvents', (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('SELECT * FROM `event_list` WHERE cid = ?;', [Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/postEvent", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('INSERT INTO `event_list` (`cid`, `name`, `description`, `time`, `date`, `location`, `eligibility`) VALUES (?,?,?,?,?,?,?);', [req.body.cid, req.body.name, req.body.description, req.body.time, req.body.date, req.body.location, req.body.eligibility]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/getEvents', (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('SELECT * FROM `event_list`;', [Number(req.body.cid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             return error
//         }
//         else {
//             // console.log(results)
//             return "Updated";
//         }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/registerEvent", (req, res) => {
//     console.log(req.body)
//     async function updateInfo() {
//         let exist = null;
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT * FROM `event_applied` WHERE sid = ? AND eid = ?;', [Number(req.body.sid), Number(req.body.eid)]);
//         if (rows.length > 0) {
//             console.log(rows)
//             exist = "Applied Already !!!!"
//         }
//         else {
//             const [err, result] = await conn.query('INSERT INTO `event_applied` (`eid`, `sid`) VALUES (?,?);', [Number(req.body.eid), Number(req.body.sid)]);
//             exist = "Applied !!!!"
//         }
//         await conn.end();
//         return exist
//         // return Object.assign({}, rows);
//         // if (error) {
//         //     return error
//         // }
//         // else {
//         //     // console.log(results)
//         //     return "Updated";
//         // }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/getAppliedEvents", (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT `event_list`.* FROM `event_list` INNER JOIN `event_applied` ON (`event_list`.`eid` = `event_applied`.`eid` AND `event_applied`.`sid` = ? );', [Number(req.body.sid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error) {
//         //     return error
//         // }
//         // else {
//         // console.log(results)
//         return rows;
//         // }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post("/getEventStudents", (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT `students`.* FROM `students` INNER JOIN `event_applied` ON (`students`.`sid` = `event_applied`.`sid` AND `event_applied`.`eid` = ? );', [Number(req.body.eid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error) {
//         //     return error
//         // }
//         // else {
//         // console.log(results)
//         return rows;
//         // }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// // app.post('/company-profile_pic ', upload.single('file') , (req,res) =>{
// //     // console.log(req.file)
// //     // console.log(req.hostname)

// //     // console.log(filepath)

// //     // res.send(filepath)
// //     console.log("CALLED COMPANy")
// //     async function updateInfo() {
// //         const mysql = require('mysql2/promise');
// //         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
// //         const filepath = "http://" + req.hostname + ":3001/" + req.file.destination +"/"+req.file.filename ;
// //         const [error, results] = await conn.query('UPDATE `company` SET profile_pic = ? WHERE cid = ?;', [filepath, req.body.cid]);

// //         await conn.end();
// //         // return Object.assign({}, rows);
// //         if (error) {
// //             return error
// //         }
// //         else {
// //             // console.log(results)
// //             return filepath;
// //         }
// //     }

// //     data = updateInfo()
// //     data.then((r) => {
// //         res.send(r);
// //         // console.log(r);
// //     }) 
// // } )

// app.post('/student_profile_pic', upload.single('file'), (req, res) => {
//     // console.log(req.file)
//     // console.log(req.hostname)

//     // console.log(filepath)

//     // res.send(filepath)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
//         const [results, error] = await conn.query('UPDATE `students` SET profile_pic = ? WHERE sid = ?;', [filepath, req.body.sid]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (results) {
//             return filepath
//         }
//         else {
//             // console.log(results)
//             return filepath;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/company_profile_pic', upload.single('file'), (req, res) => {
//     // console.log(req.file)
//     // console.log(req.hostname)

//     // console.log(filepath)

//     // res.send(filepath)
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const filepath = "http://" + req.hostname + ":3001/" + req.file.destination + req.file.filename;
//         const [result, error] = await conn.query('UPDATE `company` SET profile_pic = ? WHERE cid = ?;', [filepath, req.body.cid]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (result) {
//             return filepath
//         }
//         else {
//             // console.log(results)
//             return error;
//         }
//     }

//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })

// app.post("/getMajor", (req, res) => {
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('SELECT major FROM `education` INNER JOIN `students` ON (`students`.`sid` = `education`.`sid` AND `students`.`college` = `education`.`school_name` AND `students`.`sid` = ? );', [Number(req.body.sid)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         // if (error) {
//         //     return error
//         // }
//         // else {
//         // console.log(results)
//         return rows;
//         // }
//     }
//     data = updateInfo()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     }) 
// })
mongoose.set('debug', true);

app.listen(3001);
console.log("Server Listening on port 3001"); 