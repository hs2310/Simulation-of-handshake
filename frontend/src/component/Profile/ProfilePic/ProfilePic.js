import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { uploadProfile } from '../../../js/actions/profile-action';
class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_pic: false,
      data: '',
      profile_pic: '',

    }
    this.generalInfoHandler = this.generalInfoHandler.bind(this);
    this.educationChangeHandler = this.educationChangeHandler.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }
  // componentDidMount() {
  //   let data = { sid: localStorage.getItem('id'), call: "profile pic" }
  //   axios.post("http://localhost:3001/students/studentData", data).then(res => {
  //     this.setState({
  //       data: res.data[0],
  //       profile_pic: res.data[0].profile_pic,
  //     });
  //     console.log(this.state.data)

  //   }).catch(e => console.log(e));
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log("PROFILE PICTURE : componentDidUpdate CALLED")
    if (prevProps.profile_pic !== this.props.profile_pic) {
      this.setState({ profile_pic : this.props.profile_pic})
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
      [e.target.name]: e.target.files[0]
    })
  }
  updateInfo = async (e) => {
    e.preventDefault();
    // let data = this.state;
    // data.sid = '1';
    // console.log(this.state);
    // axios.post("http://localhost:3001/UpdateInfo", data).then(res => alert(res.data));
    // this.props.action();
    let formData = new FormData();
    formData.append('file', this.state.profile_pic);
    formData.append('sid' , localStorage.getItem('id'));
    
    this.props.uploadProfile( formData );
    this.generalInfoHandler();
  }

  render() {
    let generalInfo = null;
    if (this.state.update_general_info === true) {
      generalInfo = <div>
        <form onSubmit={this.updateInfo}>
          <div className="form-group">
            <input type="file" name="profile_pic" className="form-control" onChange={this.educationChangeHandler} />
          </div>
          <button className="btn btn-primary">Upload</button>
        </form>
      </div>
    }
    else {
      generalInfo = <div><img src={this.state.profile_pic} className="rounded-circle" width="100px" height="100px" alt="Not Uploaded!!!" /><br/><br/>
        </div>;
    }
    return <div>
      <button onClick={this.generalInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>
      {generalInfo}
    </div>
  }
}

const mapStateToProps = state => {
  return { 
      profile_pic: state.SProfile.profile_pic
  };
};
export default connect( mapStateToProps , { uploadProfile } )(ProfilePic);