import React from 'react';
import Jobs from '../Jobs/Jobs';
import { connect } from 'react-redux';
import { getApp } from '../../js/actions/job-action';
class StudentApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            filteredApplication: [],
            limit: 3,
            pageNo: 1,
            filter: '',
        }
        this.applicationSearch = this.applicationSearch.bind(this)
        this.showall = this.showall.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
    }
    prev = () => {
        this.setState({
            pageNo: this.state.pageNo - 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                filter: this.state.filter,
                sid : localStorage.getItem("id")
            }
            this.props.getApp(data)
        });
    }
    next = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                filter: this.state.filter,
                sid : localStorage.getItem("id")
            }
            this.props.getApp(data)
        });
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.application !== this.props.application) {
            this.setState({
                application: this.props.application,
                filteredApplication: this.props.application
            })
        }
    }
    componentDidMount() {
        //get applied Jobs
        let data = {
            limit: this.state.limit,
            pageNo: this.state.pageNo,
            filter: this.state.filter,
            sid: localStorage.getItem('id')
        }
        this.props.getApp(data);
    }
    applicationSearch(val) {
        this.setState({
            filter: val
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                filter: this.state.filter,
                sid: localStorage.getItem('id')
            }
            this.props.getApp(data);
        })

    }
    showall() {
        this.setState({
            filter: ""
        }, () => {
            let data = {
                limit: this.state.limit,
                pageNo: this.state.pageNo,
                filter: this.state.filter,
                sid: localStorage.getItem('id')
            }
            this.props.getApp(data);
        })
    }
    render() {
        let application = JSON.stringify(this.state.filteredApplication)
        // let application = null
        if (this.state.filteredApplication) {
            application = this.state.filteredApplication.map((i, index) => {
                return (
                    <div key={index} className="card">
                        <div className="card-body">
                            <h5>{i.title}</h5>
                            <h6>{i.cid.name}</h6>
                            <h6>STATUS : {i.applications[0].status}</h6>
                        </div>
                    </div>
                );
            })
        }
        return <div>
            <Jobs />
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div class="btn-group" role="group" style={{ alignItems: "center" }} >
                            <button type="button" ref="IT" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="all" onClick={() => { this.showall() }}>All Applications</button>
                            <button type="button" ref="FT" className={this.state.fullTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="pending" onClick={() => { this.applicationSearch("PENDING") }}>Pending</button>
                            <button type="button" ref="IT" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="reviewed" onClick={() => { this.applicationSearch("REVIEWED") }}>Reviewed</button>
                            <button type="button" ref="PT" className={this.state.partTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="declined" onClick={() => { this.applicationSearch("DECLINED") }}>Declined</button>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {application}
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
const mapStateToProps = state => {
    return {
        application: state.jobs.application
    }
}
export default connect(mapStateToProps, { getApp })(StudentApplication);