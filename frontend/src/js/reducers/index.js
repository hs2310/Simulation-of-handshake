// import { LOGIN , LOGOUT } from "../constants/action-types";

// const initialState = {
//   id: '',
//   type: '',
//   authFlag: false,
//   error: ''
// };

// function rootReducer(state = initialState, action) {
//   if (action.type === LOGIN) {
//     return Object.assign({}, state, {
//       id: action.payload.id,
//       type: action.payload.type,
//       authFlag: action.payload.authFlag,
//       error: action.payload.error
//     });
//   }
//   else if(action.type === LOGOUT){
//     return Object.assign({}, state, {
//       id: '',
//       type: '',
//       authFlag: '',
//       error: ''
//     });
//   }
//   return state;
// }

// export default rootReducer;