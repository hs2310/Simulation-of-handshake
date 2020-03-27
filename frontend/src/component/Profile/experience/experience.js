import React from 'react';
import axios from 'axios';
import UpdateExperience from './updateExperience/updateExperience';
// import {connect} from 'react-redux';
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
    componentDidMount(){
        this.update()
    }
    update = () => {
        let data ={
            sid : localStorage.getItem('id')
        }
        axios.post("http://localhost:3001/studentExperience", data).then(res => {
    // this.state.experience.push(res.data)  
         this.setState({
        experience : res.data
      });      
      console.log(this.state.experience)
    }).catch(e => console.log(e));
    }
    experienceChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    insertExp = (e) => {
        e.preventDefault();
        let { update, ...data } = this.state;
        data.sid = localStorage.getItem('id')

        axios.post("http://localhost:3001/insertExperience", data).then(res => alert(res.data));
        this.update();
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
        }
        return <div>
            <button onClick={this.experienceHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Work & Volunteer Experience</h4>
            <br />
            {experience}
        </div>
    }
}
// const mapStateToProps = state => {

//     return { 
//         id: state.rootReducer.id,
//         type: state.rootReducer.type
//     };
//   };
  export default Experience;