import { GET_JOBS , SET_APPLY ,SET_APPLIED , GET_APPLICATIONS} from "../constants/action-types";

const initialState = {
    applied : '',
    apply : '',
    jobs:[],
    application : []
};

function jobReducer(state = initialState, action) {
    if (action.type === GET_JOBS) {
        console.log( action.payload )
        return Object.assign({} , state, {
            jobs :action.payload
        })
    } else if (action.type === SET_APPLY) {
        console.log( action.payload )
        return Object.assign({} , state, {
            apply :action.payload
        })
    } else if (action.type === SET_APPLIED){
        console.log( action.payload )
        return Object.assign({} , state, {
            applied :action.payload
        })
    } else if (action.type === GET_APPLICATIONS){
        console.log( "APPLICATIONS" + JSON.stringify(action.payload) )
        return Object.assign({} , state, {
            application : action.payload
        })
    }

    return state;
}
export default jobReducer;
