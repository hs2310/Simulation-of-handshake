import React from 'react';
import axios from 'axios';

class CProfilePic extends React.Component {
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
  async componentDidMount() {
    let data = { cid: localStorage.getItem('id'), call: "profile pic" }
    await axios.post("http://localhost:3001/company/getCompanyDetails", data).then(res => {
      this.setState({
        data: res.data[0],
        profile_pic: res.data[0].profile_pic,
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
      [e.target.name]: e.target.files[0]
    })
  }
  updateInfo = async (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append('file', this.state.profile_pic);
    formData.append('cid' , localStorage.getItem('id'));
    console.log(formData.get('file'))
    
    axios.post("http://localhost:3001/company_profile_pic",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then( res => {
      this.setState({
        profile_pic : res.data
      })
      console.log(res.data);
    })
      .catch(function () {
        console.log('FAILURE!!');
      });
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
      generalInfo = <div><img src={this.state.profile_pic} className="rounded-circle" width="100px" height="100px" alt="Not Uploaded!!!" />
        </div>;
    }
    return <div>
      <button onClick={this.generalInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>
      {generalInfo}
    </div>
  }
}
export default CProfilePic;