import React from 'react';
import Navigate from '../../Navigate/Navigate';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import {connect} from 'react-redux';
import {getPostedEvents , postEvent} from '../../../js/actions/Cevent-action';

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
            eligibility: '',
            pageNo: 1,
            limit: 3
        }
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this.toggle = this.toggle.bind(this)
        this.display = this.display.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.postJob = this.postJob.bind(this)
    }
    next = () => {
        this.setState({ pageNo: this.state.pageNo + 1 }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit: this.state.limit,
                cid: localStorage.getItem("id")
            }
            this.props.getPostedEvents(data)
        })
    }
    prev = () => {
        this.setState({ pageNo: this.state.pageNo - 1 }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit: this.state.limit,
                cid: localStorage.getItem("id")
            }
            this.props.getPostedEvents(data)
        })

    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.posted_events !== this.props.posted_events){
            this.setState({
                posted_events : this.props.posted_events,
                displayJobs : this.props.posted_events[0]
            })
        }
    }
    async componentDidMount() {
        let data = {
            pageNo : this.state.pageNo,
            limit : this.state.limit,
            cid: localStorage.getItem('id')
        }
        await this.props.getPostedEvents(data)
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
            pageNo : this.state.pageNo,
            limit : this.state.limit,
            cid: localStorage.getItem('id'),
            name: this.state.name,
            description: this.state.description,
            time: this.state.time,
            date: this.state.date,
            location: this.state.location,
            eligibility: this.state.eligibility
        }
        
        this.props.postEvent(data);
        // this.props.getPostedEvents(data)
        this.toggle()
    }
    render() {
        let displayJobs = null;
        if(this.state.displayJobs){
        displayJobs = <div className="card" style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
        <div className="card-body">
            <h5 className="card-title mb-2">{this.state.displayJobs.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.displayJobs.description}</h6>
            <p className="card-text">{this.state.displayJobs.time}</p>
            <p className="card-text">{this.state.displayJobs.date}</p>
            <p className="card-text">Location : {this.state.displayJobs.location}</p>
            <p className="card-text">Eligibility : {this.state.displayJobs.eligibility}</p>
        </div>
    </div>
        }
        let postJob = null;
        let jobList = Object.keys(this.state.posted_events).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }} style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
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
                    <div className="card" style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
                        <div className="card-body">
                            <h4>Post an Event</h4>
                            <form onSubmit={this.postJob}>
                                <div className="form-group">
                                    <input type="text" name="name" onChange={this.changeHandler} placeholder="Event Title" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="description" placeholder="Event Description" onChange={this.changeHandler}></textarea>
                                </div>
                                {/* <div className="form-group">
                                    <input type="text" name="time" onChange={this.changeHandler} placeholder="Time" className="form-control" />
                                </div> */}
                                <div className="form-group">
                                    <input type="datetime-local" name="date" onChange={this.changeHandler} placeholder="Date" className="form-control" />
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
            <nav className="navbar navbar-expand-sm bg-light navbar-light" style={{ boxShadow: "1px 3px 5px grey", marginBottom : "2%" }}>
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
        posted_events : state.Cevents.posted_events
    }
}
export default connect(mapStateToProps,{getPostedEvents , postEvent})(CEvents);