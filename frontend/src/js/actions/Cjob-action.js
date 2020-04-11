import {GET_POSTED_JOBS} from "../constants/action-types";
import axios from 'axios';
export const getPostedJobs = data => {
    return (dispatch) => {
        axios.post("http://localhost:3001/jobs/getPostedJobs", data).then(res => {
            console.log("response GET POSTED JOBS " + res.data);
            dispatch(setPostedJobs(res.data))
        })
    }
}

export const postJob = data => {
    return dispatch => {
        axios.post("http://localhost:3001/jobs/postJob",data).then(res => {
            console.log("response POST JOB" + res.data)
            dispatch(setPostedJobs(res.data))
        })
    }
}

export const setPostedJobs = (data) => {
    return {
        type : GET_POSTED_JOBS , 
        payload : {...data}
    }
}