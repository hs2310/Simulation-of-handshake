const graphql = require('graphql');
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
// const User = require("../dbSchema/users");
// const { login } = require('../mutations/login');
// const { customerSignup, ownerSignup } = require('../mutations/signup');
// const { updateCustomer, updateOwner } = require('../mutations/profile');
// const { addMenuSection, addMenuItem } = require('../mutations/menu');

const Students = require('../Models/StudentModel');
const Companys = require('../Models/CompanyModel');
const Jobs = require('../Models/JobsModel');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Student = new GraphQLObjectType({
    name : 'Student',
    fields: ()=> ({
        id : {type : GraphQLID},
        sid: {type: GraphQLString},
        name : {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        objective: {type: GraphQLString},
        dob:{type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        college: {type: GraphQLString},
        mob: {type: GraphQLInt},
        profile_pic: {type: GraphQLString},
        education : {type : education},
        skills : {type : GraphQLList(skills)},
        experience : {type : experience}
    })
})
const skills = new GraphQLObjectType({
    name : "skills",
    fields : () => ({
        name : {type : GraphQLString}
    })
})
const education = new GraphQLObjectType({
    name : 'education',
    fields : () => ({
        id : {type : GraphQLID},
        school_name: {type: GraphQLString},
        edu_level: {type: GraphQLString},
        start: {type: GraphQLString},
        end: {type: GraphQLString},
        major: {type: GraphQLString},
        minor: {type: GraphQLString},
        gpa: {type: GraphQLString},
        cgpa: {type: GraphQLString},
        hide_gpa: {type: GraphQLString},
        hide_cgpa: {type: GraphQLString}
    })
}) 
const experience = new GraphQLObjectType({
    name : 'experience' ,
    fields : () => ({
        id : {type : GraphQLID},
        job_title: {type: GraphQLString},
        employer: {type: GraphQLString},
        start: {type: GraphQLString},
        end: {type: GraphQLString},
        current_position: {type: GraphQLString},
        location: {type: GraphQLString},
        description : {type : GraphQLString}
    })
})

const Company = new GraphQLObjectType({
    name : "Company",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        description: {type: GraphQLString},
        location: {type: GraphQLString},
        mob: {type: GraphQLString},
        profile_pic: {type: GraphQLString}  
    })
})

const Login =  new GraphQLObjectType({
    name : "Login" , 
    fields : () => ({
        email : {type : GraphQLString},
        password : {type : GraphQLString},
        college : {type : GraphQLString},
        company : {type : GraphQLString}
    })
})

const StudentAll =  new GraphQLObjectType({
    name : 'studentAll' ,
    fields: () => ({
        student : {type : GraphQLList(Student)}
    })
})
const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        
        studentAll: {
            type: StudentAll,
            // args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("RESOLVE CALLED !!!")
                let user = await Students.find();
                if (user) {
                    // console.log(user)
                    return { student: user};
                }
            }
        },
        student : {
            type: Student,
            args: { sid : {type: GraphQLID}},
            async resolve(parent, args){
                console.log("RESOLVE CALLED !!!")
                let user = await Students.findById({_id : args.sid});
                if (user) {
                    // console.log(user)
                    return user;
                }
            }   
        },
        company : {
            type : Company,
            args : { cid : {type : GraphQLID}},
            async resolve(parent,args){
                let user = await Companys.findById({_id : args.cid});
                if(user)
                    return user
            }
        },
        getAllJobs : {
            type : StatusType,
            args : {
                name : {type : GraphQLString},
                title : {type : GraphQLString} 
            },
            async resolve(parent, args){
                let results =  await Jobs.find({}).populate("cid")
                console.log("CALLED")
                return ({ status : 200 , message : JSON.stringify(results) })
            }
        }, getPostedJobs : {
            type : StatusType,
            args : {
                cid : {type : GraphQLString}
            },
            async resolve(parent, args){
                let results =  await Jobs.find({cid : args.cid}).populate("applications.sid")
                console.log("CALLED")
                return ({ status : 200 , message : JSON.stringify(results) })
            }
        } , getJob : {
            type : StatusType,
            args : {
                jid : {type : GraphQLString}
            },
            async resolve(parent, args){
                let results =  await Jobs.findById({_id : args.jid}).populate("applications.sid")
                console.log("CALLED")
                return ({ status : 200 , message : JSON.stringify(results) })
            }
        }
        
    }
})    

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        login : {
            type : StatusType,
            args : {
                email : {type : GraphQLString},
                password :{type : GraphQLString},
                college : {type : GraphQLString},
                company : {type : GraphQLString}
            },
            async resolve(parent ,  args) {
                let table = null;
                var msg = {status : "", message : ""};
                console.log("Inside Login Post Request", args);

                console.log("Req Body : ", args.email);
                if (args.company === "false") {
                    table = Students;
                }
                else {
                    table = Companys;
                }
                console.log("table: ",table)
                let results = await table.findOne({
                    email: args.email
                })
                console.log("name ",results.name)
                if (results !== null) {
                    if (bcrypt.compareSync(args.password, results.password)) {
                        return {status : 200 , message : "success"}
                    } else {
                        return {status : 401 ,  message : "fail"}
                    }
                } else {
                    return {status : 401 ,  message : "fail"}
                }
                console.log("@@@ msg" , msg)
                
            }
        },
        updateGeneralInfo : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                name : {type : GraphQLString},
                college : {type : GraphQLString},
                dob : {type : GraphQLString}
            },
            async resolve(parent, args){
                let msg = await Students.findOneAndUpdate({_id : args.id} , {
                    name : args.name,
                    college : args.college,
                    dob : args.dob
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        updateContactlInfo : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                email : {type : GraphQLString},
                mob : {type : GraphQLString},
            },
            async resolve(parent, args){
                let msg = await Students.findOneAndUpdate({_id : args.id} , {
                    email : args.email,
                    mob : args.mob
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        updateCareerObjective : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                objective : {type : GraphQLString}
            },
            async resolve(parent, args){
                
                let msg = await Students.findOneAndUpdate({_id : args.id} , {
                    objective : args.objective
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        updateCompanyGeneralInfo : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                name : {type : GraphQLString},
                college : {type : GraphQLString},
                dob : {type : GraphQLString}
            },
            async resolve(parent, args){
                let msg = await Companys.findOneAndUpdate({_id : args.id} , {
                    name : args.name,
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        updateCompanyContactlInfo : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                email : {type : GraphQLString},
                mob : {type : GraphQLString},
            },
            async resolve(parent, args){
                let msg = await Companys.findOneAndUpdate({_id : args.id} , {
                    email : args.email,
                    mob : args.mob
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        updateCompanyCareerObjective : {
            type : StatusType,
            args : {
                id : {type : GraphQLString},
                description : {type : GraphQLString}
            },
            async resolve(parent, args){
                
                let msg = await Students.findOneAndUpdate({_id : args.id} , {
                    description : args.description
                })
                console.log("MUTATION CALLED")
                return ({ status : 200 , message : JSON.stringify(msg) })
            }
        },
        postJob : {
            type : StatusType ,
            args : {
                cid : { type : GraphQLString },
                title: { type : GraphQLString },
                posting_date: { type : GraphQLString },
                deadline: { type : GraphQLString },
                location: { type : GraphQLString },
                salary: { type : GraphQLString },
                job_description: { type : GraphQLString },
                job_category: { type : GraphQLString },
                name : { type : GraphQLString },
            },
            async resolve (parents,args){
                let results = new Jobs ({
                    cid : args.cid,
                title: args.title,
                posting_date: args.posting_date,
                deadline: args.deadline,
                location: args.location,
                salary: args.salary,
                job_description: args.job_category,
                job_category: args.job_category,
                name : args.name,
                })
                await results.save()
                return ({ status : 200 , message : JSON.stringify(results) })
            }
        }, 
        applyJob : {
            type : StatusType , 
            args : {
                jid : {type : GraphQLString},
                sid : {type : GraphQLString}
            },
            async resolve (parent, args){
                let results = await Jobs.findOneAndUpdate({_id : args.jid} , {
                    "$push"  : { "applications" : { sid : args.sid}}
                });
                console.log()
                return ({status : 200 , message : JSON.stringify(results)})
            }
        }
    }
})
// updateEducation : {
        //     type : StatusType,
        //     args : {
        //         id : {type : GraphQLString},
        //         education : {type : GraphQLList(skills)}
        //     },
        //     async resolve(parent,args){
        //         let msg = await Students.findOneAndUpdate({_id : args.id} , {
        //             education : args.education
        //         })
        //         console.log("MUTATION CALLED")
        //         return ({ status : 200 , message : JSON.stringify(msg) })
        //     }
        // },

// education: [ education ] ,
//         skills: [{
//             name: {type: GraphQLString}
//         }],
//         experience : [ experience ]

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : mutation
});