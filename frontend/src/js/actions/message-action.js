import { GET_POSTED_MESSAGES ,GET_MESSAGES } from "../constants/action-types";
import axios from 'axios';

export const getPostedMessages = (data) => {
    return dispatch => {
        axios.post("http://54.158.111.198:3001/getPostedMessages", data).then(res => {
            dispatch(setPostedMessages(res.data))
        })  
    }
}

export const getPostedMessages = (data) => {
    return dispatch => {
        axios.post("http://54.158.111.198:3001/getMessages", data).then(res => {
            dispatch(setMessages(res.data.messages))
        })  
    }
}


export const setPostedMessages = data => {
    return {
        type : GET_POSTED_MESSAGES,
        payload : data
    }
}

export const setMessages = data => {
    return {
        type : GET_MESSAGES,
        payload : data
    }
}