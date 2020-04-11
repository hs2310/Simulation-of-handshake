import { GET_POSTED_JOBS } from '../constants/action-types';

const initialState = {
    posted_jobs:[],
    application : []
};

function CjobReducer(state = initialState, action) {
    if (action.type === GET_POSTED_JOBS) {
        console.log( action.payload )
        return Object.assign({} , state, {
            posted_jobs :action.payload
        })
    } 

    return state;
}
export default CjobReducer;
