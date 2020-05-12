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

    }

    render() {
        let student = JSON.stringify(this.state.filtered_student);
        let response = {};
        if (this.props.data.studentAll) {
            response = this.props.data.studentAll;

        }
        if (this.state.filtered_student) {
            student = this.state.filtered_student.map((i, index) => {
                return (
                    <div key={index} className="card" style={{ boxShadow: "1px 3px 5px grey", padding: "2%", marginBottom: "2%" }}>
                        <div className="card-body">
                            <img src={i.profile_pic} alt="Not Uploaded" className="rounded-circle" width="100px" height="100px" style={{ float: "left" }} />
                            <Link to={"/displayStudent/" + i._id} style={{ marginLeft: "15%" }}>{i.name}</Link>
                            <Link to={"/messages/" + i._id + "/" + i.name} style={{ float: "right" }} className="btn btn-primary">Message</Link>
                            <h6 style={{ marginLeft: "30%" }}>{i.college}</h6>
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
                            <input id="search" class="form-control" type="text" onChange={this.studentSearch} placeholder="Enter Student Name, College or Skillset " style={{ boxShadow: "1px 3px 5px grey", padding: "2%", marginBottom: "2%" }} />
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
export default graphql(studentAll, { name: "studentAll" })(StudentDetails);

