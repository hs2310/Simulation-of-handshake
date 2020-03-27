import React from 'react';
import Jobs from '../Jobs/Jobs';
import axios from 'axios';
class StudentApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            filteredApplicaion: [],
        }
        this.applicationSearch = this.applicationSearch.bind(this)
        this.showall = this.showall.bind(this)
    }
    async componentDidMount() {
        //get applied Jobs
        let data = {
            sid: 1
        }
        await axios.post("http://localhost:3001/getApplicaion", data).then(r => {
            this.setState({
                application: r.data,
                filteredApplicaion: r.data,
            })
            // console.log(this.state.application[0].jid+"\n"+r.data[0].name)
        })
    }
    applicationSearch(val) {

        let filteredSearchJobs = this.state.application;

        this.setState({
            filteredApplicaion: filteredSearchJobs.filter((job) => {
                
                return job.status.replace(/\s+/g, '').toLowerCase().includes(val.replace(/\s+/g, '').toLowerCase())
            }
            )
        })

    }
    showall() {
        this.setState({
            filteredApplicaion: this.state.application
        })
    }
    render() {
        // let applications = Object.keys(this.state.application).map(function (key){
        //     var item = <div>
        //         {this.state.application[key].name}
        //     </div>
        //     return item
        // })
        let application = this.state.filteredApplicaion.map((i, index) => {
            return (
                <div key={index} className="card">
                    <div className="card-body">
                        <h5>{i.title}</h5>
                        <h6>{i.name}</h6>
                        <h6>STATUS : {i.status}</h6>
                    </div>
                </div>
            );
        })

        return <div>
            <Jobs />
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div class="btn-group" role="group" style={{ alignItems: "center" }} >
                            <button type="button" ref="IT" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="all" onClick={() => { this.showall() }}>All Applications</button>
                            <button type="button" ref="FT" className={this.state.fullTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="pending" onClick={() => { this.applicationSearch("pending") }}>Pending</button>
                            <button type="button" ref="IT" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="reviewed" onClick={() => { this.applicationSearch("reviewed") }}>Reviewed</button>
                            <button type="button" ref="PT" className={this.state.partTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="declined" onClick={() => { this.applicationSearch("declined") }}>Declined</button>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {application}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default StudentApplication;