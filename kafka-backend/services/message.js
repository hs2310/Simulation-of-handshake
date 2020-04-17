const mongoose = require('mongoose');
const mongo = require('./dbconfig/connection');

var Messages = require('./dbconfig/Models/MessageModel')
function handle_request(req, callback) {
    var res = {};
    console.log("In handle request:" + msg.path);
    if (req.path === "getPostedMessages") {
        Messages.find({ users : {$in : [req.body.id]} }).sort("messages.timestamp").exec((err,results) => {
                console.log("+++++" , results)
                res.value = results;
                callback(null, res)
        })

    } else if (req.path === "getMessages") {
        Messages.findOne({$and : [ { users : { "$in" : [req.body.user1]}} , { users : { "$in" : [req.body.user2]}}]}).sort("messages.timestamp").exec((err,results)=>{
            console.log("+++++" , results)
                res.value = results;
                callback(null, res)
        })
    } 

}
exports.handle_request = handle_request;