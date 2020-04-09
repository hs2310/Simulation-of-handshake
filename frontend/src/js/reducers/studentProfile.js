import { GET_STUDENT , UPDATE_GENERAL_INFO ,UPDATE_CONTACT_INFO, UPDATE_JOURNEY , INSERT_EDUCATION , INSERT_EXPERIENCE, INSERT_SKILLS } from "../constants/action-types"; 

const initialState = {

    sid: '',
    name: "",
    email: "",
    password: "",
    objective: "",
    dob: "",
    city: "",
    college: "",
    state: "",
    country: "",
    mob: "",
    profile_pic: "",
    skills: [],
    education: [],
    experience: []
};

function SprofileReducer(state = initialState, action) {
    if (action.type === GET_STUDENT) {
        console.log(action.payload)
        return Object.assign({}, state, {
            sid: action.payload.sid,
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            objective: action.payload.objective,
            dob: action.payload.dob,
            city: action.payload.city,
            college: action.payload.college,
            state: action.payload.state,
            country: action.payload.country,
            mob: action.payload.mob,
            profile_pic: action.payload.profile_pic,
            skills: action.payload.skills,
            education: action.payload.education,
            experience: action.payload.experience
        });
    } else if ( action.type === UPDATE_GENERAL_INFO ) {
        console.log ( action.payload )
        return Object.assign( {}, state, {
            name: action.payload.name,
            college: action.payload.college,
            dob: action.payload.dob
        })
    } else if( action.type === UPDATE_CONTACT_INFO ) {
        console.log( action.payload )
        return Object.assign({}, state, {
            email: action.payload.email,
            mob: action.payload.mob 
        })
    } else if ( action.type === UPDATE_JOURNEY ){
        console.log( action.payload )
        return Object.assign({}, state, {
            objective : action.payload.objective
        })
    } else if ( action.type === INSERT_EDUCATION ){
        console.log( action.payload )
        return Object.assign({} , state, {
            education :action.payload.education
        })
    } else if ( action.type === INSERT_EXPERIENCE ){
        console.log( action.payload )
        return Object.assign({} , state, {
            experience :action.payload.experience
        })
    } else if ( action.type === INSERT_SKILLS ){
        console.log( action.payload )
        return Object.assign({} , state, {
            skills :action.payload.skills
        })
    }

    return state;
}

export default SprofileReducer;