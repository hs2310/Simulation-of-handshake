import React from 'react'
import axios from 'axios';
// import  {connect} from 'react-redux';
class UpdateExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            job_title: this.props.item.job_title,
            employer: this.props.item.employer,
            start: this.props.item.start,
            end: this.props.item.end,
            current_position: this.props.item.current_position,
            location: this.props.item.location,
            description: this.props.item.description
        }
        this.experienceChangeHandler = this.experienceChangeHandler.bind(this);
    }
    editJob = () => {
        if (this.state.update === true)
            this.setState({
                update: false
            });
        else {
            this.setState({
                update: true
            });
        }
    }
    experienceChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateExp = (e) => {
        
        e.preventDefault();
        let data = this.state;
        data.id = this.props.item.id;
        data.sid = localStorage.getItem('id');
        // console.log(data);
        
        axios.put("http://54.86.64.9:3001/updateExperience", data).then(res => console.log(res.data)).catch(e => alert(e.message))
        
        this.props.action();
        this.editJob();
    }
    deleteJob = () => {
        alert('called')
        let data = {};
        data.id = this.props.item.id;
           
        axios.post("http://54.86.64.9:3001/deleteExperience", data).then(res => console.log(res.data)).catch(e => alert(e.message))
        
        this.props.action();
        this.editJob();
    }
    render() {
        let school = null;
        if (this.state.update === false) {
            school = <div>
                <div class="card-body" >
                    <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.deleteJob}>X</button>
                    <button type="button" className="btn btn-primary" style={{ float: "right" }} onClick={this.editJob}>Edit</button>
                    <h5 class="card-title">{this.props.item.job_title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{this.props.item.employer}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{this.props.item.start}{this.props.item.end}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{this.props.item.location}</h6>
                    <p class="card-text">{this.props.item.Description}</p>
                </div>
            </div>
        }
        else {
            
            school = <div>
                <form onSubmit={this.updateExp} style={{padding: '5%'}}>
                <div className="form-group">
                    <input type="text" name="job_title" placeholder="Enter Job Title " className="form-control" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.job_title}/>
                </div>
                <div className="form-group">
                    <input type="text" name="employer" placeholder="Enter Employer" className="form-control" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.employer}/>
                </div>
                <div className="form-group">
                    <input type="text" name="start" placeholder="Enter Start Date" className="form-control" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.start} />
                </div>
                <div className="form-group">
                    <input type="text" name="end" placeholder="Enter End Date" className="form-control" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.end}/>
                </div>
                <input type="checkbox" name="current_position" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.current_position} /><label>Current Position</label>
                <div className="form-group">
                    <input type="text" name="location" placeholder="Enter Location" className="form-control" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.location}/>
                </div>
                <div className="form-group">
                    <textarea name="description" className="form-control" placeholder="Enter Job Description" onChange={this.experienceChangeHandler} defaultValue ={this.props.item.Description}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Edit Work Experience</button>
                </div>
            </form>
            </div>
        }
        return <div className="card" key={this.props.item.id}>
            {school}
        </div>
    }
}
// const mapStateToProps = state => {

//     return { 
//         id: state.rootReducer.id,
//         type: state.rootReducer.type
//     };
//   };
  export default UpdateExperience;