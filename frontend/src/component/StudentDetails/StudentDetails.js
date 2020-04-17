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
            filter: 0,
            filterStudent: '',
            pageNo: 1,
            limit: 3
        }
        this.studentSearch = this.studentSearch.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
    }
    next = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit: this.state.limit,
                filter: this.state.filterStudent
            }
            axios.post("http://54.158.111.198:3001/students/getAllStudents", data ).then(r => {
                this.setState({
                    student: r.data,
                    filtered_student: r.data
                })
            })
        })
    }
    prev = () => {
        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit: this.state.limit,
                filter: this.state.filterStudent
            }
            axios.post("http://54.158.111.198:3001/students/getAllStudents",data).then(r => {
                this.setState({
                    student: r.data,
                    filtered_student: r.data
                })
            })
        })
    }
    componentDidMount() {
        let data = {
            pageNo: this.state.pageNo,
            limit : this.state.limit,
            filter: this.state.filterStudent
        }
        axios.post("http://54.158.111.198:3001/students/getAllStudents",data).then(r => {
            this.setState({
                student: r.data,
                filtered_student: r.data
            })
        })
    }
    studentSearch = (e) => {
        this.setState({
            filterStudent: e.target.value
        }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit : this.state.limit,
                filter: this.state.filterStudent
            }
            axios.post("http://54.158.111.198:3001/students/getAllStudents", data).then(r => {
                this.setState({
                    student: r.data,
                    filtered_student: r.data
                })
            })
        })
        // let filteredSearchJobs = this.state.student;
        // if (e.target.value) {
        //     this.setState({
        //         filtered_student: filteredSearchJobs.filter((job) => {
        //             return (job.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.college.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.city.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
        //         }
        //         )
        //     })
        // }
        // if (e.target.value === '') {
        //     this.setState({
        //         filtered_student: filteredSearchJobs
        //     })
        // }
    }
    render() {
           let student = JSON.stringify(this.state.filtered_student) ;
           if(this.state.filtered_student){
            student = this.state.filtered_student.map((i, index) => {
            return (
                <div key={index} className="card" style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
                    <div className="card-body">
                        <img src={i.profile_pic} alt="Not Uploaded" className="rounded-circle" width="100px" height="100px" style={{ float: "left" }} />
                        <Link to={"/displayStudent/" + i._id} style={{  marginLeft: "15%"  }}>{i.name}</Link>
                        <Link to={"/messages/" + i._id + "/" +i.name} style={{ float : "right" }} className="btn btn-primary">Message</Link>
                        <h6 style={{marginLeft: "30%"  }}>{i.college}</h6>
                    </div>
                </div>
            );
        })
    }
        //     return <div>
        //         <Jobs />
        //         <div className="container" style={{marginTop : "5%"}}>
        //         {application} 
        //         </div>
        //    </div>
        return <div>
            <Navigate />
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                    <div className="col-md-4">
                        <form>
                            <i className="glyphicon glyphicon-search"></i>
                            <input id="search" class="form-control" type="text" onChange={this.studentSearch} placeholder="Enter Student Name, College or Skillset " style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}/>
                        </form>
                    </div>
                    <div className="col-md-8" >
                        {student}
                        <div style={{ width: "100%" }}>
                            <button type="button" onClick={this.prev} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
                            <button type="button" onClick={this.next} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default StudentDetails;
