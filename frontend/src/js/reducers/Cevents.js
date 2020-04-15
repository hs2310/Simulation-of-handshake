import { GET_POSTED_EVENTS } from '../constants/action-types';

const initialState = {
    posted_events:[]
};

function CeventReducer(state = initialState, action) {
    if (action.type === GET_POSTED_EVENTS) {
        console.log( action.payload )
        return Object.assign({} , state, {
            posted_events :action.payload
        })
    } 

    return state;
}
export default CeventReducer;
