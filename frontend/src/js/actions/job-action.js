import { GET_JOBS , SET_APPLY ,SET_APPLIED ,GET_APPLICATIONS} from "../constants/action-types";
import axios from "axios";

export const setJobs= (data) => ({
    type: GET_JOBS,
    payload: {...data}
});

export const getJobs = (data) => {
    return (dispatch) => {
        console.log("Inside get jobs \n" + JSON.stringify(data));

        axios.post('http://localhost:3001/jobs/getJobs',data)
            .then(res => {
                console.log("response : GET JOBS", res.data)
                let data = res.data;
                for(var i; i<res.data.length ; i++){
                    data[i].posting_date = new Date(data[i].posting_date);
                    data[i].deadline = new Date(data[i].deadline);
                }
                dispatch(setJobs(data))
            })
    }
}

export const checkApply = data => {
    return (dispatch) => {
        console.log("Inside check apply")
        axios.post("http://localhost:3001/jobs/checkapplied", data).then(res => {
            console.log("response : CHECK APPLY" + res.data)    
            dispatch(setApply(res.data))
                
		})
    }
 }

export const setApply = data => {
    return {
        type: SET_APPLY,
        payload: data
    }
}

export const apply = data =>{
    return (dispatch) => {
        console.log("inside apply")
        const url = 'http://localhost:3001/jobs/applyJobs';
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url,data,config).then((response)=>{
            dispatch(setApplied("applied"))
          })
    }
}

export const setApplied = data => {
    return {
        type: SET_APPLIED,
        payload: data
    }
}

export const getApp = data => {
    return (dispatch) => {
        console.log("Inside get applications" + JSON.stringify(data))
        axios.post("http://localhost:3001/jobs/getApplication", data).then(res => {
            console.log("response : GET APPLICATIONS" + JSON.stringify(res.data))   
            
            dispatch(setApp(res.data))
                
		})
    }
}

export const setApp = data => {
    return { 
        type : GET_APPLICATIONS,
        payload :  data
    }
}