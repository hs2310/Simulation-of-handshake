import React from 'react';
// import axios from 'axios';
import UpdateExperience from './updateExperience/updateExperience';
import {connect} from 'react-redux';
import { insertEx } from '../../../js/actions/profile-action';

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_experience: false,
            experience : [],
            job_title: '',
            employer: '',
            start: '',
            end: '',
            current_position: '',
            location: '',
            description: ''
        }
        this.experienceHandler = this.experienceHandler.bind(this);
        this.experienceChangeHandler = this.experienceChangeHandler.bind(this);
        this.insertExp = this.insertExp.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("EXPERIENCE : componentDidUpdate CALLED")
        if (prevProps.experience !== this.props.experience) {
          this.setState({ experience : this.props.experience})
        }
      }
    experienceChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    insertExp = (e) => {
        e.preventDefault();
        let data = {
            job_title: this.state.job_title,
            employer: this.state.employer,
            start: this.state.start,
            end: this.state.end,
            current_position: this.state.current_position,
            location: this.state.location,
            description: this.state.description
        }
        data.sid = localStorage.getItem('id')
        this.props.insertEx(data);
        // axios.post("http://localhost:3001/students/insertExperience", data).then(res => alert(res.data));
        
        this.experienceHandler();
    }
    experienceHandler = () => {
        if (this.state.update_experience === true)
            this.setState({
                update_experience: false
            });
        else {
            this.setState({
                update_experience: true
            });
        }
    }

    render() {
        let experience = null;
        if (this.state.update_experience === true) {
            experience = <div>
                {this.state.experience.map(element => <UpdateExperience key={element.id} item = {element} action = {this.update}/>)}
                <form onSubmit={this.insertExp}>
                    <div className="form-group">
                        <input type="text" name="job_title" placeholder="Enter Job Title " className="form-control" onChange={this.experienceChangeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="employer" placeholder="Enter Employer" className="form-control" onChange={this.experienceChangeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="start" placeholder="Enter Start Date" className="form-control" onChange={this.experienceChangeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="text
                        " name="end" placeholder="Enter End Date" className="form-control" onChange={this.experienceChangeHandler} />
                    </div>
                    <input type="checkbox" name="current_position" onChange={this.experienceChangeHandler} /><label>Current Position</label>
                    <div className="form-group">
                        <input type="text" name="location" placeholder="Enter Location" className="form-control" onChange={this.experienceChangeHandler} />
                    </div>
                    <div className="form-group">
                        <textarea name="description" className="form-control" placeholder="Enter Job Description" onChange={this.experienceChangeHandler}></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Add Work Experience</button>
                    </div>
                </form>
            </div >
        } else {
            experience = <div>
                {this.state.experience.map((item) =>
                    <div className="card" key={item._id} >
                        <div className="card-body">
                            <h5 className="card-title">{item.job_title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item.employer}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{item.start}{item.end}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{item.location}</h6>
                            <p className="card-text">{item.description}</p>
                        </div>
                    </div>

                )}
            </div>
        }
        return <div>
            <button onClick={this.experienceHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Work & Volunteer Experience</h4>
            <br />
            {experience}
        </div>
    }
}
const mapStateToProps = state => {

    return { 
        experience : state.SProfile.experience
    };
  };
export default connect(mapStateToProps , { insertEx })(Experience);
