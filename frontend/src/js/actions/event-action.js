import {GET_EVENTS} from '../constants/action-types';
import axios from 'axios';

export const getEvents = data => {
    return (dispatch) => {
        axios.post("http://localhost:3001/events/getEvents", data).then(r => {
                dispatch(setEvents(r.data))
            })
    }
}

export const setEvents = data => {
    return {
        type : GET_EVENTS,
        payload : data
    }
}