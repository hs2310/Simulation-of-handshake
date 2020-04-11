import React from 'react';
import Jobs from '../../Jobs/Jobs';
import { connect } from 'react-redux';
import { getPostedJobs, postJob } from '../../../js/actions/Cjob-action';

class CJobSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posted_jobs: [],
            toggle_post: false,
            displayJobs: '',
            title: '',
            posting_date: '',
            deadline: '',
            location: '',
            salary: '',
            job_description: '',
            job_category: '',
            pageNo: 1,
            limit: 3
        }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.toggle = this.toggle.bind(this)
        this.display = this.display.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.postJob = this.postJob.bind(this)
    }
    prev = () => {
        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                cid: localStorage.getItem("id")
            }
            this.props.getPostedJobs(data)
        });
    }
    next = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                cid: localStorage.getItem("id")
            }
            this.props.getPostedJobs(data)
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.posted_jobs !== this.props.posted_job) {
            this.setState({
                posted_jobs: nextProps.posted_jobs,
                displayJobs: nextProps.posted_jobs[0]
            })
        }
    }

    componentDidMount() {
        let data = {
            limit: this.state.limit,
            pageNo: this.state.pageNo,
            cid: localStorage.getItem('id')
        }
        this.props.getPostedJobs(data)
    }
    display(i) {
        console.log(i)
        this.setState({
            displayJobs: { ...this.state.posted_jobs[i] }
        })
    }
    toggle() {
        if (this.state.toggle_post === true)
            this.setState({
                toggle_post: false
            })
        else
            this.setState({
                toggle_post: true
            })
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postJob = async (e) => {
        e.preventDefault();
        let data = {
            limit: this.state.limit,
            pageNo: this.state.pageNo,
            cid: localStorage.getItem('id'),
            title: this.state.title,
            posting_date: this.state.posting_date,
            deadline: this.state.deadline,
            location: this.state.location,
            salary: this.state.salary,
            job_description: this.state.job_description,
            job_category: this.state.job_category
        }
        this.props.postJob(data);
        // console.log(data)
        // await axios.post("http://localhost:3001/jobs/postJob", data).then(res => {
        //     console.log(res.data)
        // })
        // await axios.post("http://localhost:3001/jobs/getPostedJobs", data).then(r => {
        //     this.setState({
        //         posted_jobs: r.data
        //     })
        //     console.log(this.state.posted_jobs)
        // })
        this.toggle()
    }
    render() {
        let displayJobs = null;
        if (this.state.displayJobs) {
            displayJobs = <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.state.displayJobs.title}</h5>
                    <p className="card-text">Salary : {this.state.displayJobs.salary}$</p>
                    <p className="card-text">Location : {this.state.displayJobs.location}</p>
                    <p className="card-text">Posting Date : {new Date(this.state.displayJobs.posting_date).getMonth() + 1}/{new Date(this.state.displayJobs.posting_date).getDate()}/{new Date(this.state.displayJobs.posting_date).getFullYear()}</p>
                    <p className="card-text">Deadline : {new Date(this.state.displayJobs.deadline).getMonth() + 1}/{new Date(this.state.displayJobs.deadline).getDate()}/{new Date(this.state.displayJobs.deadline).getFullYear()}</p>
                    <p className="card-text">Job Category : {this.state.displayJobs.job_category}</p>
                    <p className="card-text">Description : {this.state.displayJobs.job_description}</p>
                </div>
            </div>
        }


        let postJob = null;
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
        if (this.state.toggle_post === true)
            postJob = <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4>Post a Job</h4>
                            <form onSubmit={this.postJob}>
                                <div className="form-group">
                                    <input type="text" name="title" onChange={this.changeHandler} placeholder="Job Title" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="posting_date" onChange={this.changeHandler} placeholder="Posting Date (DD-MM-YYYY)" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="deadline" onChange={this.changeHandler} placeholder="Deadline (DD-MM-YYYY)" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="location" onChange={this.changeHandler} placeholder="Location" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="number" name="salary" onChange={this.changeHandler} placeholder="Salary per annum" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="job_description" placeholder="Job description" onChange={this.changeHandler}></textarea>
                                </div>
                                <div className="form-group">
                                    <select onChange={this.changeHandler} name="job_category" className="form-control">
                                        <option value=""></option>
                                        <option value="FullTime">FullTime</option>
                                        <option value="PartTime">PartTime</option>
                                        <option value="Internship">Internship</option>
                                        <option value="OnCampus">OnCampus</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary">Post a Job</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        else
            postJob = null
        return <div>
            <Jobs />

            <div className="container" style={{ marginTop: '1%' }}>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" onClick={this.toggle} className="btn btn-primary">Post a Job</button>
                    </div>
                </div>
                {postJob}
                <div className="row">
                    <div className="col-md-4">
                        {jobList}
                        <div style={{ width: "100%" }}>
                            <button type="button" onClick={this.prev} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
                            <button type="button" onClick={this.next} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {displayJobs}
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
export default connect(mapStateToProps, { getPostedJobs, postJob })(CJobSearch);