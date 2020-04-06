import { LOGIN, LOGOUT } from "../constants/action-types";
import axios from 'axios';
const jwt_decode = require('jwt-decode');

export const login = (data) => { 
    return (dispatch) =>{
    console.log("inside login action");
    let data1 = {};
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/login', data)
        .then(response => {

            console.log("response : ", response.data);
            if (response.status === 200) {
                data1.authFlag = true
                var res = response.data
                if (response.data.length > 0) {
                    data1.jwt = res
                    localStorage.setItem('jwt' , res)
                    var decoded = jwt_decode(res.split(' ')[1]);
                    localStorage.setItem('id', decoded._id)
                    data1.id = decoded._id
                }

                if (data.company) {
                    localStorage.setItem('type', 'company');
                    data1.type = 'company'
                }
                else {
                    localStorage.setItem('type', 'student');
                    data1.type = 'student'
                }
                data1.error = ""
            }
            dispatch(setLoginCredentials(data1))
        }).catch(e => {
            console.log(e);
            let data1 = {};
            // this.setState({
            data1.jwt = "";
            data1.id = "";
            data.type = "";
            data1.error = "Invalid Credentials!!";
            data1.authFlag = false;
            dispatch(setLoginCredentials(data1))
        });
    }
};

export const setLoginCredentials = (data) => {
    return {
        type: LOGIN,
        payload: { ...data }
    }
}


export const logout = () => ({
    type: LOGOUT
})
