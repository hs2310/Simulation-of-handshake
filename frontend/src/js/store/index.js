// // import { createStore } from "redux";
// import rootReducer from "../reducers/index";
// import profileReducer from "../reducers/studentProfile"
// import jobReducer from "../reducers/job";
// import { createStore,applyMiddleware,compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import {AuthMiddleware} from "../middleware/index";
// import {ProfileMiddleware} from "../middleware/profileMiddleware"
// // import {jobsMiddleware} from "../middleware/jobsMiddleware"
// // import rootReducer from './reducers';
 
// // Note: this API requires redux@>=3.1.0
// // const store = createStore(
// //   rootReducer,
// //  applyMiddleware(thunk)
// // );
// // import { login } from "../middleware/index";
// // import throttle from 'lodash.throttle';
// // import {loadState,saveState} from "../store/localStorage";
// // const persistedState = loadState();
// // const store = createStore(
// //   rootReducer,
// //   persistedState
// // );
// // store.subscribe(throttle(() => {
// //   saveState({
// //     id: store.getState().id,
// //     type: store.getState().type
// //   });
// // },1000));

// // const store = createStore(rootReducer,applyMiddleware(thunk));
    
//    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     // const store = createStore(
//     //   rootReducer,
      
//     // );
//     const reducer = combineReducers({rootReducer: rootReducer, profileReducer: profileReducer})
//     const store = createStore(
//       reducer,
//       storeEnhancers(applyMiddleware(AuthMiddleware,ProfileMiddleware))
//     );
//     // window.store = store

//     export default store;

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';

const storeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
);
window.store = store
export default store;