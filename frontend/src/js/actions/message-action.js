import { GET_POSTED_MESSAGES ,GET_MESSAGES } from "../constants/action-types";
import axios from 'axios';

export const getPostedMessages = (data) => {
    return dispatch => {
        axios.post("http://54.158.111.198:3001/getPostedMessages", data).then(res => {
            dispatch(setPostedMessages(res.data))
        })  
    }
}

export const setPostedMessages = data => {
    return {
        type : GET_POSTED_MESSAGES,
        payload : data
    }
}