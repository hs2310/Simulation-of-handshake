import { GET_POSTED_EVENTS} from '../constants/action-types';
import axios from 'axios';

export const getPostedEvents = data => {
    return (dispatch) => {
        axios.post("http://localhost:3001/events/getPostedEvents", data).then(r => {
                dispatch(setPostedEvents(r.data))
            })
    }
}
export const postEvent = data => {
    return (dispatch) => {
        axios.post("http://localhost:3001/events/postEvent", data).then(res => {
            dispatch(setPostedEvents(res.data))
        })
    }
}
export const setPostedEvents = (data) => {
    return {
        type : GET_POSTED_EVENTS,
        payload : data
    }
}