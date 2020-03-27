import React, { Component } from 'react';
//import Main from './components/Main';
// import {BrowserRouter} from 'react-router-dom';
//import Register from './Register/Register';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Redirect, Link } from 'react-router-dom';
// import { login } from '../../js/actions/index';
// import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux'
//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            college: "",
            company: false,
            authFlag: false,
            show: false,
            error: ''
        }
        //Bind the handlers to this class
        this.selecthandleChange = this.selecthandleChange.bind(this);
        this.inputhandleChange = this.inputhandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.collegeHandler = this.collegeHandler.bind(this);
    }
    selecthandleChange = e => {
        this.setState({
            college: e.target.value,
        });
    };

    inputhandleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    collegeHandler = e => {
        e.preventDefault();
        if (this.state.college === "")
            this.setState({
                company: true
            });
        this.setState({
            show: true
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            college: this.state.college,
            company: this.state.company
        }
        // //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        error: '',
                        authFlag: true
                    })

                    localStorage.setItem('id', response.data)
                    if (this.state.company) {
                        localStorage.setItem('type', 'company');
                    }
                    else {
                        localStorage.setItem('type', 'student');
                    }
                }
            }).catch(e => {
                console.log(e);
                this.setState({
                    error: <div className="alert alert-danger" style={{ marginTop: '5%' }}>Invalid Credentials!!</div>,
                    authFlag: false
                });
            });
    }
    render() {

        let redirectVar = null;
        // if (this.state.authFlag) { return <Redirect to="/home" /> }
        let error = '';
        if (localStorage.getItem('id')) {
            redirectVar = <Redirect to="/home" />
        }
        if (this.state.error === '')
            error = '';
        else {
            error = <div className="alert alert-danger">Invalid Credentials</div>
        }
        if (this.state.show === false) {
            return (

                <div style={{ marginTop: "5%", marginLeft: "20%", marginRight: "20%" }}>

                    <div style={{ textAlign: "right", marginTop: "5%" }}>
                        No account? <Link to="/register">Sign Up Here</Link>
                    </div>
                    <form onSubmit={this.collegeHandler}>
                        <h4>Sign in</h4>
                        <h6>Students & Alumni</h6>
                        Please select your school to sign in.
                        <div className="form-group" style={{ width: "30%" }}>
                            <select name="college" onChange={this.selecthandleChange} className="form-control">
                                <option value=""></option>
                                <option value="San Jose State University">San Jose State University</option>
                                <option value="University of Hogwarts">University of Hogwarts</option>
                                <option value="Standford University">Standford University</option>
                            </select>
                        </div>
                        <div>
                            <strong>New to handshake?</strong>Select your school to get started.
                        </div>
                        <div>
                            ______
                        </div>
                        <h6>Employers & Career Centers</h6>
                        Please sign in with your email on next page.<br />
                        <button className="btn btn-primary">Next</button>
                    </form>
                    {redirectVar}
                </div>
            );
        }
        if (this.state.show === true) {
            return (
                <div style={{ marginTop: "10%", marginRight: "40%", marginLeft: "40%" }}>
                    <h1>Sign In</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                onChange={this.inputhandleChange}
                                placeholder="Please your email ID"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                onChange={this.inputhandleChange}
                                placeholder="Please your password here"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <br />
                            <button className="btn btn-primary form-control">Sign In</button>
                        </div>
                    </form>
                    {error}
                    {redirectVar}
                </div>
            );
        }
    }
}
// const mapStateToProps = state => {
//     return {
//         id: state.rootReducer.id,
//         type: state.rootReducer.type,
//         authFlag: state.rootReducer.authFlag,
//         error: state.rootReducer.error
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         login: rootReducer => dispatch(login(rootReducer))
//     };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;


