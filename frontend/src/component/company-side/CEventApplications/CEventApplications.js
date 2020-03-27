import React from 'react';
import Navigate from '../../Navigate/Navigate';
import axios from 'axios';
import { Link } from 'react-router-dom';
class CEventApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posted_events: [],
            display: []
        }
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
        // this.setState({
        //     displayJobs: { ...this.state.posted_events[0] }
        // })
    }
    display(eid) {
        let data = {
            eid: eid
        }
        axios.post("http://localhost:3001/getEventStudents", data).then(res => {
            this.setState({
                display: res.data
            })
        })
    }
    render() {
        // let eventList =  Object.keys(this.state.eventList).map((item, i) => (
        //     <div className="card" key={i}>
        //         <div className="card-body">
        //             <h5 className="card-title"><Link to={"/displayStudent/" + this.state.eventList[item].sid}>{this.state.eventList[item].name}</Link></h5>
        //             <h6 className="card-subtitle mb-2 text-muted">Resume</h6>
        //             <p className="card-text">{this.state.eventList[item].resume_url}</p>
        //             <p className="card-text">{this.state.eventList[item].status}</p>
        //             <form onSubmit={e => this.onSubmit(e, this.state.eventList[item].sid, this.state.applications[item].jid, item)}>
        //                 <input type="radio" name="status" value="PENDING" onChange={this.changeHandler} /><label>PENDING</label>
        //                 <input type="radio" name="status" value="REJECTED" onChange={this.changeHandler} /><label>REJECTED</label>
        //                 <input type="radio" name="status" value="APPROVED" onChange={this.changeHandler} /><label>APPROVED</label>
        //                 <div className="form-group">
        //                     <button className="btn btn-primary">Change Status</button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // ));
        let displayEvent = Object.keys(this.state.display).map((item, i) => {
            return <div className="card" key={i}>
                <div className="card-body">
                    <h5><Link to={"/displayStudent/" + this.state.display[item].sid}>{this.state.display[item].name}</Link></h5>
                </div>
            </div>
        })
        let eventList = Object.keys(this.state.posted_events).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(this.state.posted_events[item].eid) }}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.posted_events[item].name}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{this.state.posted_events[item].location}</h6> */}
                    <p className="card-text">{this.state.posted_events[item].time}</p>
                    <p className="card-text">{this.state.posted_events[item].date}</p>
                    {/* <p className="card-text">{this.state.posted_events[item].location}</p> */}
                    {/* <p className="card-text">{this.state.posted_events[item].eligibility}</p> */}
                </div>
            </div>
        ))
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
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {eventList}
                    </div>
                    <div className="col-md-8">
                        {displayEvent}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CEventApplications;