import { GET_COMPANY, C_UPDATE_GENERAL_INFO, C_UPDATE_CONTACT_INFO, C_UPDATE_JOURNEY, COMPANY_PROFILE } from "../constants/action-types";
import axios from 'axios';

export const getCompany = (data) => {
    return (dispatch) => {
        console.log("inside Student profile action");
        // let data1 = {};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/company/getCompanyDetails', data)
            .then(response => {
                console.log("response : ", response.data);
                dispatch(setCompanyData(response.data))
            });
    }
};

export const setCompanyData = (data) => {
    return {
        type: GET_COMPANY,
        payload: { ...data }
    }
}

export const updateGenInfo = (data) => {
    return (dispatch) => {
        console.log("Inside update general information");
        axios.post('http://localhost:3001/company/UpdateCompanyInfo', data)
            .then(res => {
                console.log("response : ", res.data)
                dispatch(setGenInfo(res.data))
            })
    }
}

export const setGenInfo = (data) => {
    return {
        type: C_UPDATE_GENERAL_INFO,
        payload: { ...data }
    }
}

export const updateConInfo = (data) => {
    return (dispatch) => {
        console.log("Inside update general information");
        axios.post('http://localhost:3001/company/UpdateCompanyContactInfo', data)
            .then(res => {
                console.log("response CONTACT: ", res.data)
                dispatch(setConInfo(res.data))
            })
    }
}

export const setConInfo = (data) => {
    return {
        type: C_UPDATE_CONTACT_INFO,
        payload: { ...data }
    }
}

export const updateJourney = (data) => {
    return (dispatch) => {
        console.log("Inside update journey");
        axios.post('http://localhost:3001/company/UpdateCompanyJourney', data)
            .then(res => {
                console.log("response MYJOURNEY: ", res.data)
                dispatch(setJourney(res.data))
            })
    }
}

export const setJourney = (data) => {
    return {
        type: C_UPDATE_JOURNEY,
        payload: { ...data }
    }
}

export const uploadProfile = (data) => {
    return (dispatch) => {
        console.log("Inside Upload Profile Picture : " + data);
        axios.post('http://localhost:3001/company/company_profile_pic',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => {
            console.log("response PROFILE PIC : ", res.data)
            dispatch(setProfile(res.data))
        })
    }
}

export const setProfile = (data) => {
    return {
        type: COMPANY_PROFILE,
        payload: { ...data }
    }
}