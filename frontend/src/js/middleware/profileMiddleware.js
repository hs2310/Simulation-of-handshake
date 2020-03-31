// import { GET_STUDENT } from "../constants/action-types";
// import axios from 'axios';
// export function ProfileMiddleware() {
//     return function (next) {
//         return async function (action) {
//             if (action.type === GET_STUDENT) {
//                 console.log("ID : " + action.payload.id);
//                 await axios.post("http://localhost:3001/students/studentData",{"sid" : localStorage.getItem('id')} ).then(res =>{    
//                     console.log(res.data[0])
//                     action.payload.sid = res.data[0].sid;
//                     action.payload.name=res.data[0].name;
//                     action.payload.email=res.data[0].email;
//                     action.payload.password=res.data[0].password;
//                     action.payload.objective=res.data[0].objective;
//                     action.payload.dob= res.data[0].dob;
//                     action.payload.city =res.data[0].city;
//                     action.payload.college= res.data[0].college;
//                     action.payload.state= res.data[0].state;
//                     action.payload.country= res.data[0].country;
//                     action.payload.mob= res.data[0].mob;
//                     action.payload.profile_pic=res.data[0].profile_pic
//                 })
//                 // const res2 = axios.post("http://localhost:3001/studentSkills", action.payload.id)
//                 // const res3 = axios.post("http://localhost:3001/studentEducation", action.payload.id)
//                 // const res4 = axios.post("http://localhost:3001/studentExperience", action.payload.id)

//                 // const res5 = axios.post("http://localhost:3001/getSkills", action.payload.id)
//                 // Promise.all([res1, res2, res3, res4, res5]).then(values => {
                    
//                     // action.payload.skills = res2.then(r => {return r.data[0]});
//                     // action.payload.education = res3.then(r => {return r.data});
//                     // action.payload.experience = res4.then(r => {return r.data});
//                     // action.payload.skillSet = res5.then(r => {return r.data});
//                     // console.log(values);
//                 // })
//             }
//             return next(action);
//         };
//     };
// }