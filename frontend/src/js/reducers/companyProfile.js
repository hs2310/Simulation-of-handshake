import { GET_COMPANY, C_UPDATE_GENERAL_INFO, C_UPDATE_CONTACT_INFO, C_UPDATE_JOURNEY, COMPANY_PROFILE } from "../constants/action-types";

const initialState = {
    cid: "",
    name: "",
    email: "",
    password: "",
    description: "",
    location: "",
    mob: "",
    profile_pic: ""
}

function CprofileReducer(state = initialState, action) {
    if (action.type === GET_COMPANY) {
        console.log(action.payload)
        return Object.assign({}, state, {
            cid: action.payload.sid,
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            description: action.payload.description,
            location: action.payload.location,
            mob: action.payload.mob,
            profile_pic: action.payload.profile_pic,
            
        });
    } else if ( action.type === C_UPDATE_GENERAL_INFO ) {
        console.log ( action.payload )
        return Object.assign( {}, state, {
            name: action.payload.name,
            location : action.payload.location
        })
    } else if( action.type === C_UPDATE_CONTACT_INFO ) {
        console.log( action.payload )
        return Object.assign({}, state, {
            email: action.payload.email,
            mob: action.payload.mob 
        })
    } else if ( action.type === C_UPDATE_JOURNEY ){
        console.log( action.payload )
        return Object.assign({}, state, {
            description : action.payload.description
        })
    } else if ( action.type ===  COMPANY_PROFILE){
        console.log( action.payload )
        return Object.assign({} , state, {
            profile_pic : action.payload.profile_pic
        })
    }

    return state;
}

export default CprofileReducer;