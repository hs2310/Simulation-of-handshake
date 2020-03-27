import React from 'react';
import Navigate from '../../Navigate/Navigate';
import { Link } from 'react-router-dom';
import axios from 'axios';
class CEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posted_events: [],
            toggle_post: false,
            displayJobs: '',
            name: '',
            description: '',
            time: '',
            date: '',
            location: '',
            eligibility: ''
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
        await axios.post("http://localhost:3001/getPostedEvents", data).then(r => {
            this.setState({
                posted_events: r.data
            })
            console.log(this.state.posted_events)
        })
        this.setState({
            displayJobs: { ...this.state.posted_events[0] }
        })
    }
    display(i) {
        console.log(i)
        this.setState({
            displayJobs: { ...this.state.posted_events[i] }
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
            cid: localStorage.getItem('id'),
            name: this.state.name,
            description: this.state.description,
            time: this.state.time,
            date: this.state.date,
            location: this.state.location,
            eligibility: this.state.eligibility
        }
        console.log(data)
        await axios.post("http://localhost:3001/postEvent", data).then(res => {
            console.log(res.data)
        })
        await axios.post("http://localhost:3001/getPostedEvents", data).then(r => {
            this.setState({
                posted_events: r.data
            })
            console.log(this.state.posted_events)
        })
        this.toggle()
    }
    render() {

        let displayJobs = this.state.displayJobs;
        let postJob = null;
        let jobList = Object.keys(this.state.posted_events).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.posted_events[item].name}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{this.state.posted_events[item].description}</h6> */}
                    <p className="card-text">{this.state.posted_events[item].time}</p>
                    <p className="card-text">{this.state.posted_events[item].date}</p>
                    {/* <p className="card-text">{this.state.posted_events[item].location}</p> */}
                    {/* <p className="card-text">{this.state.posted_events[item].eligibility}</p> */}
                </div>
            </div>
        ))
        if (this.state.toggle_post === true)
            postJob = <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4>Post an Event</h4>
                            <form onSubmit={this.postJob}>
                                <div className="form-group">
                                    <input type="text" name="name" onChange={this.changeHandler} placeholder="Event Title" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="description" placeholder="Event Description" onChange={this.changeHandler}></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="time" onChange={this.changeHandler} placeholder="Time" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="date" onChange={this.changeHandler} placeholder="Date" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="location" onChange={this.changeHandler} placeholder="Location" className="form-control" />
                                </div>
                                <div className="form-group">
                                    {/* <input type="text" name="eligibility" onChange={this.changeHandler} placeholder="Eligibility" className="form-control" /> */}
                                    <select className="form-control" name="eligibility" onChange={this.changeHandler}>
                                        <option></option>
                                        <option value="All Majors">All Majors</option>
                                        <option value="MS Software Engineering">MS Software Engineering</option>
                                        <option value="MS Electrical Engineering">MS Electrical Engineering</option>
                                        <option value="MS Computer Sciennce">MS Computer Sciennce</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary">Post an Event</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        else
            postJob = null
        return <div>
            <Navigate />
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/events">Post an Event</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/EventApplication">Applicants</Link>
                    </li>
                </ul>
            </nav>

            <div className="container" style={{ marginTop: '1%' }}>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" onClick={this.toggle} className="btn btn-primary">Post an Event</button>
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
                                <h5 className="card-title mb-2">{displayJobs.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{displayJobs.description}</h6>
                                <p className="card-text">{displayJobs.time}</p>
                                <p className="card-text">{displayJobs.date}</p>
                                <p className="card-text">Location : {displayJobs.location}</p>
                                <p className="card-text">Eligibility : {displayJobs.eligibility}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CEvents;