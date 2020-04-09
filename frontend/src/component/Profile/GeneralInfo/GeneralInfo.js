import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';

import { updateGenInfo } from '../../../js/actions/profile-action'

import ProfilePic from '../ProfilePic/ProfilePic';
class GeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_general_info: false,
            data : '',
            profile_pic: '',
            name: this.props.name,
            college: this.props.college,
            dob: this.props.dob
        }
        this.generalInfoHandler = this.generalInfoHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    
    
    componentDidUpdate(prevProps, prevState) {
      console.log("GENERAL INFO : componentDidUpdate CALLED")
      if (prevProps.name !== this.props.name) {
        this.setState({ name : this.props.name})
      }
      if (prevProps.college !== this.props.college) {
        this.setState({ college : this.props.college})
      }
      if (prevProps.dob !== this.props.dob) {
        this.setState({ dob : this.props.dob})
      }
    }
    
    generalInfoHandler = () => {
      if (this.state.update_general_info === true)
        this.setState({
          update_general_info: false
        });
      else {
        this.setState({
          update_general_info: true
        });
      }
    }
    educationChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateInfo = (e) => {
        e.preventDefault();
        let data = {
            name: this.state.name,
            college: this.state.college,
            dob: this.state.dob,
            sid: localStorage.getItem('id')
        }
        
        
        // axios.post("http://localhost:3001/students/UpdateInfo", data).then(res => alert(res.data));
        this.props.updateGenInfo(data);
        this.generalInfoHandler();
    }

    render() {
      let generalInfo =null;
      if (this.state.update_general_info === true) {
        generalInfo = <div>
          
          <form onSubmit={this.updateInfo}>
            {/* <div className="form-group">
              <input type="file" name="profile_pic" className = "form-control" onChange={this.educationChangeHandler} />
            </div> */}
            <div className="form-group">
              <input type="text" name="name" placeholder="Enter your Name" className="form-control" defaultValue={this.props.name} onChange={this.educationChangeHandler}/>
            </div>
            <div className="form-group">
              <select name="college" className="form-control" defaultValue={this.props.college} onChange={this.educationChangeHandler}>
                <option value=""></option>
                <option value="San Jose State University">San Jose State University</option>
                <option value="University of Hogwarts">University of Hogwarts</option>
                <option value="Standford University">Standford University</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" name="dob" placeholder="Date of Birth DD-MM-YYYY" className="form-control" defaultValue={this.props.dob} pattern = "^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$" onChange={this.educationChangeHandler} required/>
            </div>
            <button type = "submit" className="btn btn-primary">Update</button>  
          </form>
        </div>
      }
      else {
        generalInfo = <div><h4>{this.props.name}</h4>{this.props.college}<br />{this.props.dob}</div>;
      }  
        return <div>
            <button onClick={this.generalInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>General Information</h4>
            <br/>
            <ProfilePic /> 
            {generalInfo}
        </div>
    }
}
const mapStateToProps = state => {

  return { 
      sid: state.SProfile.sid,
      name: state.SProfile.name,
      college : state.SProfile.college,
      dob : state.SProfile.dob
  };
};

export default connect(mapStateToProps,{ updateGenInfo })(GeneralInfo);