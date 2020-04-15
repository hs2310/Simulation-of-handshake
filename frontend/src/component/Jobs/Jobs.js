import React from 'react'
// import axios from 'axios';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import {Link } from 'react-router-dom';
import Navigate from '../Navigate/Navigate';
class Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: false
    }
  }
  render() {
    return <div>
      <Navigate />
      <nav className="navbar navbar-expand-sm bg-light navbar-light" style={{ boxShadow: "1px 3px 5px grey", marginBottom : "2%" }}>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/jobSearch">Job Search</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/studentApplications">Applications</Link>
          </li>
        </ul>
      </nav>
    </div>
  }
}
export default Jobs;