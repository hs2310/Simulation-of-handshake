//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer = require('multer');
var path = require('path');
const http = require('http');
const socketio = require('socket.io');



//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://54.158.111.198:3000', credentials: true }));

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
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://54.158.111.198:3000');
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

const mongo = require('./connection');

//Routes

var auth = require("./routes/auth");
var students =  require("./routes/student");
var company = require("./routes/company");
var jobs = require("./routes/jobs");
var events = require("./routes/events");

app.use("/" , auth);  
app.use("/students", students);
app.use("/company", company);
app.use("/jobs", jobs);
app.use("/events", events);

var Messages = require("./Models/MessageModel")
app.post('/getPostedMessages', (req,res)=>{
    console.log("+++++++ INSIDE GETPOSTED MESSAGES +++++++")
    Messages.find({ users : {$in : [req.body.id]} }).sort("messages.timestamp").exec((err,results) => {
        if(err) res.send(err)
        else    
            console.log("+++++" , results)
            res.send(results)
    })
})
app.post('/getMessages', (req,res)=> {
    Messages.findOne({$and : [ { users : { "$in" : [req.body.user1]}} , { users : { "$in" : [req.body.user2]}}]}).sort("messages.timestamp").exec((err,results)=>{
        if(err) res.send(err)
        else    
            console.log("+++++" , results)
            res.send(results)
    })
})
const server = http.createServer(app);
const io = socketio(server);
let online = []
io.on('connection', socket =>{
    console.log("=====> WS CONNECTED <=====")
    socket.on("join", function (data){
        
        let d = {id : socket.id , data : data}
        online.push(d)
        console.log("online : " + JSON.stringify(online))
    })
    // socket.emit("message" , "HI THERE !!!!")
    socket.on("message" , (msg) => {
        console.log("====="+ msg + "======")
        let flag = false;
        Messages.findOne({$and : [ { users : { "$in" : [msg.sender]}} , { users : { "$in" : [msg.reciever]}}]},{new :true}).exec((err,results) => {
            if(err) console.log(err)
            else {
                if (!results){
                    let newMessage = new Messages({
                        users : [msg.sender , msg.reciever],
                        name : msg.names
                    })
                    newMessage.messages.push(msg.message)
                    if(newMessage.save()){
                        for( let i = 0 ; i < online.length ; i++ )
                        {
                            if(online[i].data === msg.reciever){
                                flag = true
                            }
                        }
                        if(flag)
                           socket.broadcast.to(online[Object.keys(online).find(key => online[key].data === msg.reciever)].id).emit("message",newMessage)   
                        console.log("NULL ID - > " + socket)              
                        socket.emit("message",newMessage)   
                        console.log("NULL ID - > " + socket)              
                    }
                } else {
                    Messages.findOneAndUpdate({$and : [ { users : { "$in" : [msg.sender]}} , { users : { "$in" : [msg.reciever]}}]},{
                        "$push":
                        {
                            "messages": msg.message
                        }
                    },{new :true}).exec((err , results)=> {
                        
                        for( let i = 0 ; i < online.length ; i++ )
                        {
                            if(online[i] !== null){
                                if(online[i].data === msg.reciever){
                                    flag = true
                                }
                            }
                        }
                        if(flag)
                           socket.broadcast.to(online[Object.keys(online).find(key => online[key].data === msg.reciever)].id).emit("message",results)   
                        console.log("NOT NULL ID - > " + socket)              
                        socket.emit("message",results)   
                        console.log("NULL ID - > " + socket)              
                    })
                }
            }
        
            
        })
    })

    socket.on("disconnect" , (msg) => {
       console.log("online: " + online)
       delete online[(Object.keys(online).find(key => online[key].id === socket.id))];
       var filtered = online.filter(function (el) {
        return el != null;
      });
      online = filtered
       console.log("online: "+ online)
    })

})
// //start your server on port 3001


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
// mongoose.set('debug', true);

server.listen(3001);
console.log("Server Listening on port 3001"); 