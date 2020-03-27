import React from 'react';
import axios from 'axios';
import CProfilePic from '../CProfilePic/CProfilePic';
class CGeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_general_info: false,
            cid: '',
            
            name: '',
            location: ''
        }
        this.generalInfoHandler = this.generalInfoHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    componentDidMount() {
        console.log(this.props.data.cid)
        this.setState({
            cid : this.props.data.cid,
            
            name: this.props.data.name,
            location: this.props.data.location
        });
        
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
        data.sid = this.props.data.cid;
        console.log(this.state);
        axios.post("http://localhost:3001/UpdateCompanyInfo", data).then(res => console.log(res.data));
        this.generalInfoHandler();
    }
    render(){
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
              <input type="text" name="location" placeholder="Enter Company Location" className="form-control" defaultValue={this.state.location} onChange={this.educationChangeHandler} required/>
            </div>
            <button type = "submit" className="btn btn-primary">Update</button>  
          </form>
        </div>
      }
      else {
        generalInfo = <div><h4>{this.state.name}</h4>{this.state.location}</div>;
      }  
        return <div>
            <button onClick={this.generalInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>General Information</h4>
            <CProfilePic/>
            {generalInfo}
        </div>
    }
}

export default CGeneralInfo;
