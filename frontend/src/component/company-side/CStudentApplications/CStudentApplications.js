import React from 'react';
import Jobs from '../../Jobs/Jobs';
import axios from 'axios';
import {Link} from 'react-router-dom';
class CStudentApplications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cid: '',
            posted_jobs: '',
            displayJobs: '',
            applications: [],
            status: 'PENDING'
        }
        this.display = this.display.bind(this);
        // this.displayApplication = this.displayApplication.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
    }
    async componentDidMount() {
        let data = {
            cid: localStorage.getItem('id')
        }
        await axios.post("http://localhost:3001/getPostedJobs", data).then(r => {
            this.setState({
                posted_jobs: r.data
            })
            console.log(this.state.posted_jobs)
        })


        // this.setState({
        //     displayJobs: { ...this.state.application[0] }
        // })
        console.log("Applications :" + this.state.applications)
    }
    display(i) {
        console.log(i)
        // this.setState({
        //     displayJobs: { ...this.state.application[i] }
        // })
        let data = {
            jid: this.state.posted_jobs[i].jid
        }
        axios.post("http://localhost:3001/getAllApplications", data).then(r => {
            this.setState({
                applications: r.data
            })
        })
        console.log(this.state.applications);
    }
    changeHandler = (e) => {
        this.setState({
            status: e.target.value
        })
    }
    onSubmit = (e, sid, jid, i) => {
        e.preventDefault();
        let data = {
            status: this.state.status,
            sid: sid,
            jid: jid
        }
        axios.post("http://localhost:3001/updateStatus", data).then(r => {
            // this.display(jid)
            // this.setState({
            //     applications: 
            // })
            var stateCopy = Object.assign({}, this.state);
            stateCopy.applications = stateCopy.applications.slice();
            stateCopy.applications[i] = Object.assign({}, stateCopy.applications[i]);
            stateCopy.applications[i].status = data.status;
            this.setState(stateCopy);
        })
    };
    render() {
        let displayApplication = Object.keys(this.state.applications).map((item, i) => (
            <div className="card" key={i}>
                <div className="card-body">
                    <h5 className="card-title"><Link to={"/displayStudent/" + this.state.applications[item].sid}>{this.state.applications[item].name}</Link></h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{this.state.applications[item].resume_url}</h6> */}
                    <a href = {this.state.applications[item].resume_url} rel="noopener noreferrer" target="_blank">Resume</a>
                    <p className="card-text">{this.state.applications[item].status}</p>
                    <form onSubmit={e => this.onSubmit(e, this.state.applications[item].sid, this.state.applications[item].jid, item)}>
                        <input type="radio" name="status" value="PENDING" onChange={this.changeHandler} /><label>PENDING</label>
                        <input type="radio" name="status" value="DECLINED" onChange={this.changeHandler} /><label>DECLINED</label>
                        <input type="radio" name="status" value="REVIEWED" onChange={this.changeHandler} /><label>REVIEWED</label>
                        <div className="form-group">
                            <button className="btn btn-primary">Change Status</button>
                        </div>
                    </form>
                </div>
            </div>
        ));
        let jobList = Object.keys(this.state.posted_jobs).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.posted_jobs[item].title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.posted_jobs[item].name}</h6>
                    <p className="card-text">{this.state.posted_jobs[item].location}</p>
                    <p className="card-text">{this.state.posted_jobs[item].job_category}</p>
                </div>
            </div>
        ))
        return <div>
            <Jobs />
            <div className="container" style={{ marginTop: '1%' }}>
                <div className="row">
                    <div className="col-md-4">
                        {jobList}
                    </div>
                    <div className="col-md-8">
                        {displayApplication}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CStudentApplications;