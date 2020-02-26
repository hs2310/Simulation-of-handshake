import React from 'react'
import axios from 'axios';

class UpdateSchool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            school_name: this.props.item.school_name,
            edu_level: this.props.item.edu_level,
            start: this.props.item.start,
            end: this.props.item.end,
            major: this.props.item.major,
            minor: this.props.item.minor,
            gpa: this.props.item.gpa,
            hide_gpa: this.props.item.hide_gpa,
            cgpa: this.props.item.cgpa,
            hide_cgpa: this.props.item.hide_cgpa

        }
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
    }
    editSchool = () => {
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
    educationChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateEdu = (e) => {

        e.preventDefault();
        let data = this.state;
        data.id = this.props.item.id;
        data.sid = '1';
        // console.log(data);

        axios.post("http://localhost:3001/updateEducation", data).then(res => console.log(res.data)).catch(e => alert(e.message))

        this.props.action();
        this.editSchool();
    }
    deleteSchool = () => {
        
        let data = {};
        data.id = this.props.item.id;

        axios.post("http://localhost:3001/deleteEducation", data).then(res => console.log(res.data)).catch(e => alert(e.message))

        this.props.action();
        this.editSchool();
    }
    render() {
        let school = null;
        if (this.state.update === false) {

            school = <div className="card-body">
                <button type="button" className="btn btn-danger" style={{ float: "right" }} onClick={this.deleteSchool}>X</button>
                <button type="button" className="btn btn-primary" style={{ float: "right" }} onClick={this.editSchool}>Edit</button>
                <h5 className="card-title">{this.props.item.school_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.edu_level}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.start}{this.props.item.end}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.major}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.minor}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.gpa}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{this.props.item.cgpa}</h6>
            </div>

        }
        else {

            school = <div>
                <form onSubmit={this.updateEdu} style={{ padding: '5%' }}>
                    <div className="form-group">
                        <input type="text" name="school_name" placeholder="Enter School Name" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.school_name} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="edu_level" placeholder="Enter Education Level" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.edu_level} />
                    </div>
                    <div className="form-group">
                        <input type="date" name="start" placeholder="Enter Start Date" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.start} />
                    </div>
                    <div className="form-group">
                        <input type="date" name="end" placeholder="Enter End Date" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.date} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="major" placeholder="Enter Major" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.major} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="minor" placeholder="Enter Minor" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.minor} />
                    </div>
                    <div className="form-group">
                        <input type="number" name="gpa" placeholder="Enter Department GPA" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.gpa} />
                    </div>

                    <input type="checkbox" name="hide_gpa" onChange={this.educationChangeHandler} defaultValue={this.props.item.hide_gpa} /><label>Hide from Employers</label>

                    <div className="form-group">
                        <input type="number" name="cgpa" placeholder="Enter Cummulative GPA" className="form-control" onChange={this.educationChangeHandler} defaultValue={this.props.item.cgpa} />
                    </div>

                    <input type="checkbox" name="hide_cgpa" onChange={this.educationChangeHandler} defaultValue={this.props.item.hide_cgpa} /><label>Hide from Employers</label>

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

export default UpdateSchool;