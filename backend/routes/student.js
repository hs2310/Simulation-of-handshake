var express = require('express')
var app = express.Router()

const Students = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');

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
    Students.findOne({ _id: req.body.sid }, (error, results) => {
        res.send(results.skills);
    })
});
app.post('/DeleteSkill', (req, res) => {
    console.log("Data : " + req.body.sid)
    Students.findOne({ _id: req.body.sid }, (function (error, doc) {

        var skill = doc.skills;
        for (var i = 0; i < skill.length; ++i) {
            var x = skill[i];
            if (x["_id"] == req.body.id)
                delete (x);
        }
        Students.save(doc);
    })
    )
});

// app.post('/UpdateSkill', (req, res) => {
//     async function getSkills() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, fields] = await conn.query('INSERT INTO `skillset` (sid,skid) VALUES (?,?)', [req.body.sid, req.body.selectSkill]);
//         await conn.end();
//         return rows;
//     }

//     data = getSkills()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/studentEducation', (req, res) => {

//     async function getEducation() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, f2] = await conn.execute('SELECT * FROM `education` WHERE sid = ?', [req.body.sid]);
//         await conn.end();
//         //return Object.assign({}, rows);
//         return rows;
//     }

//     data = getEducation()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/studentExperience', (req, res) => {
//     async function getExperience() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [rows, f3] = await conn.execute('SELECT * FROM `experience` WHERE sid = ?', [Number(req.body.sid)]);
//         await conn.end();
//         // return Object.assign({}, rows);
//         return rows;
//     }

//     data = getExperience()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/insertExperience', (req, res) => {
//     console.log(req.body);
//     async function getExperience() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('INSERT INTO `experience` (sid, job_title, employer, start, end, current_position, location, Description) VALUES (?,?,?,?,?,?,?,?)', [req.body.sid, req.body.job_title, req.body.employer, req.body.start, req.body.end, req.body.current_position, req.body.location, req.body.description]);
//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) return error;
//         else {
//             return "Inserted";
//         }
//     }

//     data = getExperience()
//     data.then((r) => {
//         res.send(r.data);
//         // console.log(r);
//     })
// })
// app.put('/updateExperience', (req, res) => {
//     console.log(req.body);
//     async function updateExperience() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('UPDATE `experience` SET job_title = ?, employer = ?, start = ?, end = ?, current_position = ? ,location = ? ,Description = ? WHERE id = ?', [req.body.job_title, req.body.employer, req.body.start, req.body.end, req.body.current_position, req.body.location, req.body.description, Number(req.body.id)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             console.log(error);
//             return error
//         }
//         else {
//             console.log(results)
//             return "Inserted";
//         }
//     }

//     data = updateExperience()
//     data.then((r) => {
//         res.send(JSO.stringify(r.data));
//         // console.log(r);
//     })
// })
// app.post('/deleteExperience', (req, res) => {
//     console.log(req.body);
//     async function updateExperience() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('DELETE FROM `experience`  WHERE id = ?;', [Number(req.body.id)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {

//             return error
//         }
//         else {
//             console.log(results)
//             return "Deleted";
//         }
//     }

//     data = updateExperience()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/insertEducation', (req, res) => {
//     console.log(req.body);
//     async function getExperience() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('INSERT INTO `education` (sid,school_name,edu_level,start,end,major,minor,gpa,cgpa,hide_gpa,hide_cgpa)  VALUES (?,?,?,?,?,?,?,?,?,?,?)', [req.body.sid, req.body.school_name, req.body.edu_level, req.body.start, req.body.end, req.body.major, req.body.minor, req.body.gpa, req.body.cgpa, req.body.hide_gpa, req.body.hide_cgpa]);
//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) return error;
//         else {
//             return "Inserted";
//         }
//     }

//     data = getExperience()
//     data.then((r) => {
//         res.send(r.data);
//         // console.log(r);
//     })
// })
// app.post('/updateEducation', (req, res) => {
//     // console.log(req.body);
//     async function updateEducation() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.execute('UPDATE `education` SET school_name = ?, edu_level = ?, start = ?, end = ?, major = ? ,minor = ? ,gpa = ?, cgpa = ? , hide_gpa = ?, hide_cgpa = ? WHERE id = ?', [req.body.school_name, req.body.edu_level, req.body.start, req.body.end, req.body.major, req.body.minor, req.body.gpa, req.body.cgpa, req.body.hide_gpa, req.body.hide_cgpa, Number(req.body.id)]);

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

//     data = updateEducation()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/deleteEducation', (req, res) => {
//     console.log(req.body);
//     async function deleteEducation() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('DELETE FROM `education`  WHERE id = ?;', [Number(req.body.id)]);

//         await conn.end();
//         // return Object.assign({}, rows);
//         if (error) {
//             console.log(error);
//             return error
//         }
//         else {
//             console.log(results)
//             return "Deleted";
//         }
//     }

//     data = deleteEducation()
//     data.then((r) => {
//         res.send(r);
//         // console.log(r);
//     })
// })
// app.post('/UpdateInfo', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('UPDATE `students` SET name = ? , college = ?, dob = ? WHERE sid = ?;', [req.body.name, req.body.college, req.body.dob, Number(req.body.sid)]);

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
// app.post('/UpdateContactInfo', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.execute('UPDATE `students` SET mob = ? , email = ? WHERE sid = ?;', [req.body.mob, req.body.email, Number(req.body.sid)]);

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
// app.post('/UpdateJourney', (req, res) => {
//     console.log(req.body);
//     async function updateInfo() {
//         const mysql = require('mysql2/promise');
//         const conn = await mysql.createConnection({ host: 'handshake.chhilor2hpzo.us-east-1.rds.amazonaws.com',port :3306, user: 'root', password: 'admin123',database: 'handshake' });
//         const [error, results] = await conn.query('UPDATE `students` SET objective = ? WHERE sid = ?;', [req.body.objective, Number(req.body.sid)]);

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
//         res.send(r.data);
//         // console.log(r);
//     })
// })

module.exports = app
