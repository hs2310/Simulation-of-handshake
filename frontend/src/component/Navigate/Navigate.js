import React from 'react'
// import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Link } from 'react-router-dom';
import * as bs from 'react-bootstrap';
class Navigate extends React.Component {
  constructor(props){
    super(props)
    this.state={
      msg:false
    }
  }
  logout=() =>{
    this.setState({msg : true })     
  }
  render() {
    let redirectVar = null;
    if (!localStorage.getItem('id')) {
      return <Redirect to="/" />
    }
    else if (this.state.msg){
      cookie.remove("cookie",{path : '/'})
      redirectVar = <Redirect to="/" />
    }
      return <div>
        {redirectVar}
        <bs.Navbar bg="primary" variant="dark" style={{ boxShadow: "1px 3px 5px grey"}}>
          <Link className="navbar-brand" to="/home">Handshake</Link>
          {/* <bs.Navbar.Brand to="/home">Handshake</bs.Navbar.Brand> */}
  
          <bs.Nav className="mr-auto">
          <Link to ="/jobs" className="nav-link">Jobs</Link>
          <Link to ="/events" className="nav-link">Events</Link>
          <Link to ="/students" className="nav-link">Students</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/logout" className="nav-link">Logout</Link>
          </bs.Nav>
         
        </bs.Navbar>
      </div>
    
  }
}
export default Navigate;