import React, { Component } from 'react';
//import Main from './components/Main';
// import {BrowserRouter} from 'react-router-dom';
//import Register from './Register/Register';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class Register extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            email: "",
            password: "",
            college: "",
            company: "",
            location: "",
            choice:"",
            show:"none",
            hide:"none"
        }
        //Bind the handlers to this class
        this.selecthandleChange = this.selecthandleChange.bind(this);
        this.inputhandleChange = this.inputhandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSiteChanged = this.onSiteChanged.bind(this);
    }
    onSiteChanged = e =>{
        if(e.target.value === "company")
        this.setState({
            show: "block",
            hide: "none" 
        });
        else
        this.setState({
            show: "none" ,
            hide : "block" 
        });

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
    
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name : this.state.name,
            email: this.state.email,
            password: this.state.password,
            college: this.state.college,
            company: this.state.company,
            location: this.state.location
        } 
        let url = "http://54.158.111.198:3001/";
        if (this.state.show === "block" && this.state.hide === "none")
            url = url + "company-signup";
        else if (this.state.show === "none" && this.state.hide ==="block")
            url = url + "student-signup";

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(url, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.data === "Inserted") {
                    this.setState({
                        error: <div className="alert alert-success" style={{ marginTop: '5%' }}>Signed Up Successfully !!</div>,
                    })
                }
                else if(response.data === "User Already Exists !!"){
                    this.setState({
                        error: <div className="alert alert-danger" style={{ marginTop: '5%' }}>User Already Exists!!</div>,
                    })
                }   
            });
    }
    render() {
        if (localStorage.getItem('id')) {
            return <Redirect to="/home" />
        }
        return (
            <div style={{ marginTop: "10%", marginRight: "40%", marginLeft: "40%" }}>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.inputhandleChange}
                            placeholder="Please enter your name"
                            required
                        />
                    </div>
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
                    <input 
                        type="radio"
                        name="choice" 
                        value= "student"  
                        onChange={this.onSiteChanged} /> Student
                    <input 
                        type="radio" 
                        name="choice" 
                        value= "company" 
                        onChange={this.onSiteChanged} /> Company
                    <div className="form-group" style={{display : this.state.show}}>
                        <input
                            className="form-control"
                            type="text"
                            name="location"
                            onChange={this.inputhandleChange}
                            placeholder="Enter Company Location"
                            
                        />
                    </div>
                    <div className="form-group" style={{ display : this.state.hide}}>
		{/*  <select name="college" onChange={this.selecthandleChange} className="form-control">
                                <option value=""></option>
                                <option value="San Jose State University">San Jose State University</option>
                                <option value="University of Hogwarts">University of Hogwarts</option>
                                <option value="Standford University">Standford University</option>
                            </select>
                   */}<input type="text" name="college" onChange={this.selecthandleChange} className="form-control"/>
		</div>
                    <div className="form-group">
                        <br />
                        <button className="btn btn-primary form-control">Sign In</button>
                    </div>

                </form>
                {this.state.error}
            </div>
        );

    }
}
//Export the App component so that it can be used in index.js
export default Register;
