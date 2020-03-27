// import { LOGIN,LOGOUT } from "../constants/action-types";
// import axios from 'axios';
// export function AuthMiddleware() {
//   return function (next) {
//     return async function (action) {
//       if (action.type === LOGIN) {
//         console.log("LOGIN Called")
//         axios.defaults.withCredentials = true;
//         await axios.post("http://localhost:3001/login", action.payload).then(response => {
//           console.log("Status Code : ", response.status);
//           if (response.status === 200) {
//             action.payload.authFlag = true;
//             action.payload.id = response.data;
//             action.payload.type = '';
//             action.payload.error = '';
//           }
//           if (action.payload.company === false) {
//             action.payload.type = 'students';
//             localStorage.setItem('type','students');
//             localStorage.setItem('id',response.data)
//           }
//           else if (action.payload.company === true) {
//             action.payload.type = 'company';
//             localStorage.setItem('type','company')
//             localStorage.setItem('id',response.data)
//           }
          
//           console.log("ACTION" + action.payload);
//         }).catch(e => {

//           action.payload.id = '';
//           action.payload.type = '';
//           action.payload.authFlag = false;
//           action.payload.error = 'Invalid Credentials !!!';

//         })
//         console.log("processing in reducer")
//       }
//       else if (action.type === LOGOUT) {
//         console.log("LogOut Middleware Called")
//       }
//       return next(action);
//     };
//   };
// }