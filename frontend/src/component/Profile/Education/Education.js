import React from 'react';
import axios from 'axios';
import UpdateSchool from './UpdateSchool/UpdateSchool';
class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_education: false,
            school_name:'',
            edu_level: '',
            start: '',
            end: '',
            major: '',
            minor: '',
            gpa: '',
            hide_gpa: '',
            cgpa: '',
            hide_cgpa: ''
        }
        this.educationHandler = this.educationHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.insertEdu = this.insertEdu.bind(this);
    }
    
    educationChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    insertEdu = (e) => {
        e.preventDefault();
        let { update, ...data } = this.state;
        data.sid = '1';

        axios.post("http://localhost:3001/insertEducation", data).then(res => alert(res.data));
        this.props.action();
        this.educationHandler();
    }
    educationHandler = () => {
        if (this.state.update_education === true)
            this.setState({
                update_education: false
            });
        else {
            this.setState({
                update_education: true
            });
        }
    }

    render() {
        let education = null;
        if (this.state.update_education === true) {
            education = <div>
              {this.props.education.map(element => <UpdateSchool key={element.id} item = {element} action = {this.props.action}/>)}
              <h4>Add School</h4>
              <form onSubmit={this.insertEdu}>
                <div className = "form-group">
                  <input type = "text" name="school_name" placeholder="Enter School Name" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "text" name="edu_level" placeholder="Enter Education Level" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "text" name="start" placeholder="Enter Start Date DD-MM-YYYY" className="form-control" pattern= "^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "text" name="end" placeholder="Enter End Date DD-MM-YYYY" className="form-control" pattern= "^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "text" name="major" placeholder="Enter Major" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "text" name="minor" placeholder="Enter Minor" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                <div className = "form-group">
                  <input type = "number" name="gpa" placeholder="Enter Department GPA" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                
                  <input type = "checkbox" name="hide_gpa" onChange={this.educationChangeHandler}/><label>Hide from Employers</label>
                
                <div className = "form-group">
                  <input type = "number" name="cgpa" placeholder="Enter Cummulative GPA" className="form-control" onChange={this.educationChangeHandler}/>
                </div>
                
                  <input type = "checkbox" name="hide_cgpa" onChange={this.educationChangeHandler}/><label>Hide from Employers</label>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">Add School</button>
                </div>
              </form>                                         
            </div>
          }
          else{
          education = <div>
                   {this.props.education.map((item) =>
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
          }
        return <div>
            <button onClick={this.educationHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Education</h4>
            <br />
            {education}
        </div>
    }
}
export default Education;