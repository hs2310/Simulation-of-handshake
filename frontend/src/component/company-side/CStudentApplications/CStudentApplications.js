import React from 'react';
import Jobs from '../../Jobs/Jobs';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostedJobs, updateStatus } from '../../../js/actions/Cjob-action';
class CStudentApplications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cid: '',
            posted_jobs: '',
            displayJobs: '',
            applications: [],
            status: 'PENDING',
            jobId: '',
            pageNo: 1,
            limit: 3,
            pageNoA: 1,
            i: ''
        }
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        // this.nextA = this.nextA.bind(this)
        // this.prevA = this.prevA.bind(this)

        this.display = this.display.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        // this.displayApplication = this.displayApplication.bind(this)
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.posted_jobs !== this.props.posted_jobs) {
            this.setState({ posted_jobs: this.props.posted_jobs })
        }
        if (this.state.i) {
            if (prevState.applications !== this.props.posted_jobs[this.state.i].applications) {
                this.setState({ applications: this.props.posted_jobs[this.state.i].applications })
            }
        }
    }
    prev = () => {
        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                cid: localStorage.getItem('id')
            }
            // axios.post("http://localhost:3001/jobs/getPostedJobs", data).then(r => {
            //     this.setState({
            //         posted_jobs: r.data
            //     })

            // })
            this.props.getPostedJobs(data);
        });
    }
    next = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                cid: localStorage.getItem('id')
            }
            // axios.post("http://localhost:3001/jobs/getPostedJobs", data).then(r => {
            //     this.setState({
            //         posted_jobs: r.data
            //     })

            // })
            this.props.getPostedJobs(data);
        });
    }
    // prevA = () => {
    //     if(this.state.i){
    //     this.setState({
    //         pageNoA: this.state.pageNoA - 1
    //     }, () => {

    //         let data = {
    //             jid: this.state.posted_jobs[this.state.i]._id,
    //             pageNo : this.state.pageNoA,
    //             limit : this.state.limitA
    //         }
    //         axios.post("http://localhost:3001/jobs/getAllApplications", data).then(r => {
    //             this.setState({
    //                 jobId: this.state.posted_jobs[this.state.i]._id,
    //                 applications: r.data[0].applications
    //             }, () => { console.log(this.state.applications); })
    //         })
    //     });
    // }
    // }
    // nextA = () => {
    //     alert("CALLED")
    //     if(this.state.i){
    //     this.setState({
    //         pageNoA: this.state.pageNoA + 1
    //     }, () => {
    //         let data = {
    //             jid: this.state.posted_jobs[this.state.i]._id,
    //             pageNo : this.state.pageNoA,
    //             limit : this.state.limitA
    //         }
    //         axios.post("http://localhost:3001/jobs/getAllApplications", data).then(r => {
    //             this.setState({
    //                 jobId: this.state.posted_jobs[this.state.i]._id,
    //                 applications: r.data[0].applications
    //             }, () => { console.log(this.state.applications); })
    //         })
    //     });
    // }
    // }

    async componentDidMount() {
        let data = {
            limit: this.state.limit,
            pageNo: this.state.pageNo,
            cid: localStorage.getItem('id')
        }
        // await axios.post("http://localhost:3001/jobs/getPostedJobs", data).then(r => {
        //     this.setState({
        //         posted_jobs: r.data
        //     })
        //     console.log(this.state.posted_jobs)
        // })
        this.props.getPostedJobs(data);


        // this.setState({
        //     displayJobs: { ...this.state.application[0] }
        // })
        console.log("Applications :" + this.state.applications)
    }
    display(i) {
        console.log(i)
        this.setState({
            pageNoA: 0
        })
        // let data = {
        //     jid: this.state.posted_jobs[i]._id,
        //     pageNo : this.state.pageNoA,
        //     limit : this.state.limitA
        // }
        // axios.post("http://localhost:3001/jobs/getAllApplications", data).then(r => {
        //     this.setState({
        //         jobId: this.state.posted_jobs[i]._id,
        //         applications: r.data[0].applications
        //     }, () => { console.log(this.state.applications); })
        // })
        this.setState({
            i: i,
            jobId: this.state.posted_jobs[i]._id,
            applications: this.state.posted_jobs[i].applications
        })
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
            jid: jid,
            limit: this.state.limit,
            pageNo: this.state.pageNo,
            cid: localStorage.getItem('id')
        }
        // axios.post("http://localhost:3001/jobs/updateStatus", data).then(r => {
        //     // this.display(jid)
        //     // this.setState({
        //     //     applications: 
        //     // })

        //     var stateCopy = Object.assign({}, this.state);
        //     stateCopy.applications = stateCopy.applications.slice();
        //     stateCopy.applications[i] = Object.assign({}, stateCopy.applications[i]);
        //     stateCopy.applications[i].status = data.status;
        //     this.setState(stateCopy);
        // })
        this.props.updateStatus(data);
    };
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" };
        // let displayApplication = JSON.stringify(this.state.applications);
        let displayApplication = <div>{Object.keys(this.state.applications).map((item, i) => (
            <div className="card" key={i} style={style_box}>
                <div className="card-body">
                    <h5 className="card-title"><Link to={"/displayStudent/" + this.state.applications[item].sid._id}>{this.state.applications[item].sid.name}</Link></h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{this.state.applications[item].resume_url}</h6> */}
                    <h6 className="card-subtitle mb-2 text-muted">STATUS : {this.state.applications[item].status}</h6>
                    <a href={this.state.applications[item].resume_url} rel="noopener noreferrer" target="_blank">Resume</a>


                    <form onSubmit={e => this.onSubmit(e, this.state.applications[item].sid._id, this.state.jobId, item)}>
                        <input type="radio" name="status" value="PENDING" onChange={this.changeHandler} /><label>PENDING</label><br />
                        <input type="radio" name="status" value="DECLINED" onChange={this.changeHandler} /><label>DECLINED</label><br />
                        <input type="radio" name="status" value="REVIEWED" onChange={this.changeHandler} /><label>REVIEWED</label><br />
                        <div className="form-group">
                            <button className="btn btn-primary">Change Status</button>
                        </div>
                    </form>
                </div>
            </div>
        ))}
            <div style={{ width: "100%" }}>
                <button type="button" onClick={this.prevA} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
                <button type="button" onClick={this.nextA} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
            </div>
        </div>
        let jobList = Object.keys(this.state.posted_jobs).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item); this.setState({ i: item }) }} style={style_box} >
                <div className="card-body">
                    <h5 className="card-title">{this.state.posted_jobs[item].title}</h5>
		{/*<h6 className="card-subtitle mb-2 text-muted">{this.state.posted_jobs[item]._id}</h6>*/}
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
                        <div style={{ width: "100%" }}>
                            <button type="button" onClick={this.prev} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
                            <button type="button" onClick={this.next} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
                        </div>
                    </div>
                    <div className="col-md-7 offset-md-1">
                        {displayApplication}
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps = state => {
    return {
        posted_jobs: state.Cjobs.posted_jobs
    }
}
export default connect(mapStateToProps, { getPostedJobs, updateStatus })(CStudentApplications);
