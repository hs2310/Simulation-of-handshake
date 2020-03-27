import React from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';
import ProfilePic from '../ProfilePic/ProfilePic';
class GeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_general_info: false,
            data : '',
            profile_pic: '',
            name: '',
            college: '',
            dob: ''
        }
        this.generalInfoHandler = this.generalInfoHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    async componentDidMount (){
      let data ={sid : localStorage.getItem('id') , call : "generalInfo"}
      await axios.post("http://localhost:3001/studentData", data).then(res => {
      this.setState({
        data: res.data[0],
        profile_pic: res.data[0].profile_pic,
            name: res.data[0].name,
            college: res.data[0].college,
            dob: res.data[0].dob
      });
      console.log(this.state.data)
      
    }).catch(e => console.log(e));
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
        let data = this.state;
        data.sid = localStorage.getItem('id')
        console.log(this.state);
        axios.post("http://localhost:3001/UpdateInfo", data).then(res => alert(res.data));
        this.props.action();
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
              <input type="text" name="name" placeholder="Enter your Name" className="form-control" defaultValue={this.state.name} onChange={this.educationChangeHandler}/>
            </div>
            <div className="form-group">
              <select name="college" className="form-control" defaultValue={this.state.college} onChange={this.educationChangeHandler}>
                <option value=""></option>
                <option value="San Jose State University">San Jose State University</option>
                <option value="University of Hogwarts">University of Hogwarts</option>
                <option value="Standford University">Standford University</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" name="dob" placeholder="Date of Birth DD-MM-YYYY" className="form-control" defaultValue={this.state.dob} pattern = "^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$" onChange={this.educationChangeHandler} required/>
            </div>
            <button type = "submit" className="btn btn-primary">Update</button>  
          </form>
        </div>
      }
      else {
        generalInfo = <div><h4>{this.state.name}</h4>{this.state.college}<br />{this.state.dob}</div>;
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
// const mapStateToProps = state => {

//   return { 
//       id: state.rootReducer.id,
//       type: state.rootReducer.type
//   };
// };
export default GeneralInfo;