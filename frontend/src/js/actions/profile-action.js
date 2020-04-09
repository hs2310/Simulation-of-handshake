import { GET_STUDENT, UPDATE_GENERAL_INFO, UPDATE_CONTACT_INFO, UPDATE_JOURNEY, INSERT_EDUCATION, INSERT_EXPERIENCE, INSERT_SKILLS, STUDENT_PROFILE } from "../constants/action-types";
import axios from 'axios';


// export const getStudentData = (data) => ({
//     type: GET_STUDENT,
//     payload: { ...data }
// });

// const jwt_decode = require('jwt-decode');

export const getStudent = (data) => {
    return (dispatch) => {
        console.log("inside Student profile action");
        // let data1 = {};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/students/StudentData', data)
            .then(response => {
                console.log("response : ", response.data);
                dispatch(setStudentData(response.data))
            });
    }
};

export const setStudentData = (data) => {
    return {
        type: GET_STUDENT,
        payload: { ...data }
    }
}

export const updateGenInfo = (data) => {
    return (dispatch) => {
        console.log("Inside update general information");
        axios.post('http://localhost:3001/students/UpdateInfo', data)
            .then(res => {
                console.log("response : ", res.data)
                dispatch(setGenInfo(res.data))
            })
    }
}

export const setGenInfo = (data) => {
    return {
        type: UPDATE_GENERAL_INFO,
        payload: { ...data }
    }
}

export const updateConInfo = (data) => {
    return (dispatch) => {
        console.log("Inside update general information");
        axios.post('http://localhost:3001/students/UpdateContactInfo', data)
            .then(res => {
                console.log("response CONTACT: ", res.data)
                dispatch(setConInfo(res.data))
            })
    }
}

export const setConInfo = (data) => {
    return {
        type: UPDATE_CONTACT_INFO,
        payload: { ...data }
    }
}

export const updateJourney = (data) => {
    return (dispatch) => {
        console.log("Inside update journey");
        axios.post('http://localhost:3001/students/updateJourney', data)
            .then(res => {
                console.log("response MYJOURNEY: ", res.data)
                dispatch(setJourney(res.data))
            })
    }
}

export const setJourney = (data) => {
    return {
        type: UPDATE_JOURNEY,
        payload: { ...data }
    }
}

export const insertEduc = (data) => {
    return (dispatch) => {
        console.log("Inside insert education");
        axios.post('http://localhost:3001/students/insertEducation', data)
            .then(res => {
                console.log("response INSERT EDUCATION: ", res.data)
                dispatch(setEducation(res.data))
            })
    }
}
export const updateEduc = (data) => {
    return (dispatch) => {
        console.log("Inside insert education");
        axios.post('http://localhost:3001/students/updateEducation', data)
            .then(res => {
                console.log("response UPDATE EDUCATION: ", res.data)
                dispatch(setEducation(res.data))
            })
    }
}

export const deleteEduc = (data) => {
    return (dispatch) => {
        console.log("Inside delete education");

        axios.post('http://localhost:3001/students/deleteEducation', data)
            .then(res => {
                console.log("response DELETE EDUCATION: ", res.data)
                dispatch(setEducation(res.data))
            })
    }
}


export const setEducation = (data) => {
    return {
        type: INSERT_EDUCATION,
        payload: { ...data }
    }
}

export const insertEx = (data) => {
    return (dispatch) => {
        console.log("Inside insert education");
        axios.post('http://localhost:3001/students/insertExperience', data)
            .then(res => {
                console.log("response INSERT EXPERIENCE: ", res.data)
                dispatch(setExperience(res.data))
            })
    }
}
export const updateEx = (data) => {
    return (dispatch) => {
        console.log("Inside insert education");
        axios.post('http://localhost:3001/students/updateExperience', data)
            .then(res => {
                console.log("response UPDATE EXPERIENCE: ", res.data)
                dispatch(setExperience(res.data))
            })
    }
}

export const deleteEx = (data) => {
    return (dispatch) => {
        console.log("Inside delete experience");

        axios.post('http://localhost:3001/students/deleteExperience', data)
            .then(res => {
                console.log("response DELETE EXPERIENCE: ", res.data)
                dispatch(setExperience(res.data))
            })
    }
}

export const setExperience = (data) => {
    return {
        type: INSERT_EXPERIENCE,
        payload: { ...data }
    }
}

export const updateSkil = (data) => {
    return (dispatch) => {
        console.log("Inside insert education");
        axios.post('http://localhost:3001/students/UpdateSkill', data)
            .then(res => {
                console.log("response UPDATE SKILLS: ", res.data)
                dispatch(setSkill(res.data))
            })
    }
}

export const deleteSkil = (data) => {
    return (dispatch) => {
        console.log("Inside delete experience");

        axios.post('http://localhost:3001/students/DeleteSkill', data)
            .then(res => {
                console.log("response DELETE SKILLS: ", res.data)
                dispatch(setSkill(res.data))
            })
    }
}


export const setSkill = (data) => {
    return {
        type: INSERT_SKILLS,
        payload: { ...data }
    }
}

export const uploadProfile = (data) => {
    return (dispatch) => {
        console.log("Inside Upload Profile Picture : " + data);
        axios.post('http://localhost:3001/students/student_profile_pic',
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
        type: STUDENT_PROFILE,
        payload: { ...data }
    }
}