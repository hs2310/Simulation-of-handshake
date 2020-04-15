import { GET_EVENTS } from '../constants/action-types';

const initialState = {
    posted_events:[]
};

function eventReducer(state = initialState, action) {
    if (action.type === GET_EVENTS) {
        console.log( action.payload )
        return Object.assign({} , state, {
            posted_events :action.payload
        })
    } 

    return state;
}
export default eventReducer;
