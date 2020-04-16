import { GET_POSTED_MESSAGES,GET_MESSAGES } from "../constants/action-types";

const initialState = {
    list : [],
    res : []
};

function msgReducer(state = initialState, action) {
  if (action.type === GET_POSTED_MESSAGES) {
    return Object.assign({}, state, {
      list : action.payload
    });
  }
  else if(action.type === GET_MESSAGES){
    return Object.assign({}, state, {
      res : action.payload
    });
  }
  return state;
}

export default msgReducer;
