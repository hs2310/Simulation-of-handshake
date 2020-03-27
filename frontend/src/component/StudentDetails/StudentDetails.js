import React from 'react';
import Navigate from '../Navigate/Navigate';
import axios from 'axios';
import { Link } from 'react-router-dom';
class StudentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: [],
            filtered_student: [],
            filter: 0
        }
        this.studentSearch =  this.studentSearch.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:3001/getAllStudents").then(r => {
            this.setState({
                student: r.data,
                filtered_student: r.data
            })
        })
    }
    studentSearch = (e) => {
        let filteredSearchJobs = this.state.student;
        if (e.target.value) {
          this.setState({
            filtered_student: filteredSearchJobs.filter((job) => {
              return (job.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.college.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.city.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
            }
            )
          })
        }
        if(e.target.value === ''){
            this.setState({
                filtered_student: filteredSearchJobs
            })   
        }
      }
    render() {
    //    let student = null ;
    //    if()
        let student = this.state.filtered_student.map((i, index) => {
            return (
                <div key={index} className="card">
                    <div className="card-body">
                    <img src={i.profile_pic} alt="Not Uploaded" className="rounded-circle" width="100px" height="100px" style={{float : "left"}}/>
                        <Link to={"/displayStudent/" + i.sid}>{i.name}</Link>
                        <h6>{i.college}</h6>
                        
                        <h6>{i.city}</h6>
                    </div>
                </div>
            );
        })

        //     return <div>
        //         <Jobs />
        //         <div className="container" style={{marginTop : "5%"}}>
        //         {application} 
        //         </div>
        //    </div>
        return <div>
            <Navigate />
            <div className="container" style={{marginTop : "5%"}}>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <i className="glyphicon glyphicon-search"></i>
                            <input id="search" class="form-control" type="text" onChange={this.studentSearch} placeholder="Enter Student Name, College or Skillset " />
                        </form>
                    </div>
                    <div className="col-md-8" >
                        {student}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default StudentDetails;