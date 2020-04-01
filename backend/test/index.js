var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function() {

        //Login
        it("should login user", function(done) {
            server
                .post("/login")
                .send({ email: 'draco.malfoy@standford.edu',
                password: '12345678',
                college: 'Standford University',
                company: false })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

        //Signup
        it("should get major of student", function(done) {
            server
                .post("/getMajor")
                .send({
                   sid : '2'
                })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });


        //Search Results
        it("Should get company details", function(done) {
            server
                .post("/company/getCompanyDetails")
                .send
                ({
                    cid : '1'
                })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });


        //Property Page
        it("Should get student education", function(done) {
            server
                .post("/studentEducation")
                .send({ sid: "2"})
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

        //Owner Bookings
        it("should get posted events by a company", function(done) {
            server
                .post("/getPostedEvents")
                .send({ cid : "1"  })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

   
});