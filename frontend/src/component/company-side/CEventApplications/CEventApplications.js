import React from 'react';
import Navigate from '../../Navigate/Navigate';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getPostedEvents } from '../../../js/actions/Cevent-action'
class CEventApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posted_events: [],
            display: [],
            pageNo: 1,
            limit: 3,
            i :''
        }
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
    }
    next = () => {
        this.setState({ pageNo: this.state.pageNo + 1 }, () => {
            let data = {
                pageNo: this.state.pageNo,
                limit: this.state.limit,
                cid: localStorage.getItem("id")
            }
            this.props.getPostedEvents(data);
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
    componentDidUpdate(prevProps , prevState){
        if(prevProps.posted_events !== this.props.posted_events){
            this.setState({
                posted_events : this.props.posted_events
            })
        }
    }
    async componentDidMount() {
        let data = {
            pageNo : this.state.pageNo,
            limit: this.state.limit,
            cid: localStorage.getItem('id')
        }
        this.props.getPostedEvents(data)
        // this.setState({
        //     displayJobs: { ...this.state.posted_events[0] }
        // })
    }
    display(i) {
        
        // axios.post("http://54.158.111.198:3001/events/getEventStudents", data).then(res => {
            this.setState({
                display: this.state.posted_events[i].applications
            })
            
        // })
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
            return <div className="card" key={i} style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
                <div className="card-body">
                    <h5><Link to={"/displayStudent/" + this.state.display[item].sid._id}>{this.state.display[item].sid.name}</Link></h5>
                </div>
            </div>
        })
        let eventList = Object.keys(this.state.posted_events).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }} style={{ boxShadow: "1px 3px 5px grey", padding: "2%" , marginBottom : "2%" }}>
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
            <div className="container" style={{marginTop : "5%"}}>
                <div className="row">
                    <div className="col-md-4">
                        {eventList}
                        <div style={{ width: "100%" }}>
                            <button type="button" onClick={this.prev} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
                            <button type="button" onClick={this.next} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {displayEvent}
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
export default connect(mapStateToProps , {getPostedEvents})(CEventApplications);