import React from 'react';
// import cookie from 'react-cookies';
// import { useParams } from 'react-router-dom';
// import * as bs from 'react-bootstrap';
// import {connect} from 'react-redux';
import axios from 'axios';
import Navigate from '../Navigate/Navigate';
// import { logout } from '../../js/actions/index';

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: [],
            skills: [],
            education: [],
            data: []
        }
    }
    // static propTypes = {
    //     match: PropTypes.object.isRequired,

    //   };
    async componentDidMount() {

        console.log(this.props.match.params);
        let data = {
            sid: this.props.match.params.id
        }
        
        console.log(this.state.education)
        await axios.post("http://localhost:3001/students/studentData", data).then(
            res => {
                this.setState({
                    data: res.data,
                    education : res.data.education,
                    experience : res.data.experience,
                    skills : res.data.skills
                })
            }
        )
        console.log(this.state.data)
    }
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        return <div>
            <Navigate />
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                    <div className="col-md-4" style={style_box}>
                    
                        <h4>General Information</h4>
                        <img src={this.state.data.profile_pic} alt="Not Uploaded!!!"  className="rounded-circle" height="100px" width="100px" style={{float : "left"}}/> 
                        <h5>{this.state.data.name}</h5>
                        
                        <h6>{this.state.data.college}</h6>
                    </div>
                    <div className="col-md-8" style={style_box}>
                        <h4>
                            My Journey
                        </h4>
                        <span className="text-justify">{this.state.data.objective}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={style_box}>
                        <h4>Contact Info</h4>
                        <h6>Email :{this.state.data.email}</h6>
                        <h6>Mob : {this.state.data.mob}</h6>
                    </div>
                    <div className="col-md-8" style={style_box}>
                        <h4>
                            Education
                        </h4>
                        <div>
                            {this.state.education.map((item) =>
                                <div className="card" key={item.id} >
                                    <div className="card-body">
                                        <h5 className="card-title">{item.school_name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.edu_level}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.start}{item.end}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.major}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.minor}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.gpa}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.cgpa}</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={style_box}>
                        <h4>Skills</h4>
                        <div>{this.state.skills.map(item => <div key={item.id}>{item.name}</div>)}</div>
                    </div>
                    <div className="col-md-8" style={style_box}>
                        <h4>
                            Work Experience
                        </h4>
                        <div>
                            {this.state.experience.map((item) =>
                                <div className="card" key={item.id} >
                                    <div className="card-body">
                                        <h5 className="card-title">{item.job_title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.employer}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.start}{item.end}</h6>
                                        <h6 className="card-subtitle mb-2 text-muted">{item.location}</h6>
                                        <p className="card-text">{item.Description}</p>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* {this.props.match.params.id}
            <br /> */}
            {/* {this.state.name}<br/>
            {this.state.description}<br/>
            {this.state.email}<br/>
            {this.state.location}<br />
            {this.state.mob} <br/>
            {this.state.profile_pic} */}
        </div>
    }
}
// const mapStateToProps = state => {
//     return {
//         id: state.rootReducer.id,
//         jobs: state.jobReducer.jobs
//     };
// };

// export default connect(mapStateToProps)(CompanyProfile);
export default StudentProfile;