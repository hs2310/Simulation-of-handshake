import React from 'react';
import Jobs from '../../Jobs/Jobs';
import axios from 'axios';

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
            job_category: ''
        }
        this.toggle = this.toggle.bind(this)
        this.display = this.display.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.postJob = this.postJob.bind(this)
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
        this.setState({
            displayJobs: { ...this.state.posted_jobs[0] }
        })
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
    // checkchangeHandler = e =>{
    //     const options = this.state.job_category
    //     let index
    //     if(e.target.checked){
    //         options.push(e.target.value)
    //     } else {
    //         // or remove the value from the unchecked checkbox from the array
    //         index = options.indexOf(e.target.value)
    //         options.splice(index, 1)
    //       }
    //       this.setState({ job_category: options })
    // }
    postJob = async (e) => {
        e.preventDefault();
        let data = {
            cid: localStorage.getItem('id'),
            title: this.state.title,
            posting_date: this.state.posting_date,
            deadline: this.state.deadline,
            location: this.state.location,
            salary: this.state.salary,
            job_description: this.state.job_description,
            job_category: this.state.job_category
        }
        console.log(data)
        await axios.post("http://localhost:3001/postJob", data).then(res => {
            console.log(res.data)
        })
        await axios.post("http://localhost:3001/getPostedJobs", data).then(r => {
            this.setState({
                posted_jobs: r.data
            })
            console.log(this.state.posted_jobs)
        })
        this.toggle()
    }
    render() {
        let displayJobs = this.state.displayJobs;
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
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{displayJobs.title}</h5>
                                <p className="card-text">Salary : {displayJobs.salary}$</p>
                                <p className="card-text">Location : {displayJobs.location}</p>
                                <p className="card-text">Posted On : {displayJobs.posting_date}</p>
                                <p className="card-text">Deadline : {displayJobs.deadline}</p>
                                <p className="card-text">Job Category : {displayJobs.job_category}</p>
                                <p className="card-text">Description : {displayJobs.job_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CJobSearch;