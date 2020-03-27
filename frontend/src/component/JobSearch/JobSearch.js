import React from 'react'
// import axios from 'axios';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import Navigate from '../Navigate/Navigate';
// import { getJobs } from '../../js/actions/job-action';
// import { connect } from 'react-redux';
import ApplicationForm from './ApplicationForm';
import Jobs from '../Jobs/Jobs';
import axios from 'axios';
class JobSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: false,
      displayJobs: {},
      apply: '',
      jobs: [],
      filteredJobs: [],
      appliedFilters: [],
      fullTimeStatus: false,
      partTimeStatus: false,
      internshipStatus: false,
      onCampusStatus: false,
    }
    this.checkApplied = this.checkApplied.bind(this)
    this.changeStatusHandler = this.changeStatusHandler.bind(this)
    this.SelectedFilterArray = this.SelectedFilterArray.bind(this)
    this.jobSearch = this.jobSearch.bind(this)
  }
  async componentDidMount() {
    // await this.props.getJobs();
    await axios.get("http://localhost:3001/getJobs").then(res =>{  
    // console.log("JOBS " + this.props.jobs);
    this.setState({
      filteredJobs : res.data,
      jobs : res.data,
      
    })
    this.setState({
      displayJobs: { ...this.state.jobs[0] }
    })
  })
  }
  filterClear = () => {
    this.setState({
      fullTimeStatus: false,
      partTimeStatus: false,
      onCampusStatus: false,
      internshipStatus: false,
      appliedFilters: [],
      filteredJobs: this.state.jobs
    })
  }
  display(i) {
    console.log(i)
    this.setState({
      apply: '',
      displayJobs: { ...this.state.filteredJobs[i] }
    })
  }
  checkApplied(jid) {

    let data = {
      jid: jid,
      sid: localStorage.getItem('id')
    }
    axios.post("http://localhost:3001/checkapplied", data).then(res => {
      this.setState({
        apply: res.data
      })
    })
  }
  // filter1handler = e => {
  //   this.setState({
  //     filter1: e.target.value
  //   })
  //   let data = {
  //     filter: this.state.filter1
  //   }
  //   axios.post("http://localhost:3001/jobfilter1", data).then(res => {
  //     this.setState({
  //       jobs: res.data
  //     })
  //   })
  // }
  changeStatusHandler = (e) => {
    switch (e) {
      case "FullTime":
        this.setState({
          fullTimeStatus: !this.state.fullTimeStatus
        }, () => {
          this.SelectedFilterArray()
        })
        break;
      case "PartTime":
        this.setState({
          partTimeStatus: !this.state.partTimeStatus
        }, () => {
          this.SelectedFilterArray()
        })
        break;
      case "Internship":
        this.setState({
          internshipStatus: !this.state.internshipStatus
        }, () => {
          this.SelectedFilterArray()
        })
        break;
      case "OnCampus":
        this.setState({
          onCampusStatus: !this.state.onCampusStatus
        }, () => {
          this.SelectedFilterArray()
        })
        break;
        default:
          break;
    }
  }


  SelectedFilterArray = () => {
    var filters = []
    if (this.state.fullTimeStatus) {
      filters.push("FullTime");
    }
    if (this.state.partTimeStatus) {
      filters.push("PartTime");
    }
    if (this.state.internshipStatus) {
      filters.push("Internship");
    }
    if (this.state.onCampusStatus) {
      filters.push("OnCampus");
    }

    let tempJobs;
    if (filters.length > 0) {
      tempJobs = this.state.jobs.filter((job) => {
        return (filters.includes(job.job_category))
      }
      )
    }
    else {
      tempJobs = this.state.jobs;
    }
    this.setState({
      appliedFilters: filters,
      filteredJobs: tempJobs,
      displayJobs: tempJobs[0]
    })


    return tempJobs;

  }

  jobSearch = (e) => {
    let filteredSearchJobs = this.SelectedFilterArray();
    if (e.target.value) {
      this.setState({
        filteredJobs: filteredSearchJobs.filter((job) => {
          return (job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()) || job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
        }
        )
      })
      if(this.state.filteredJobs.length > 0)
      this.setState({
        displayJobs : this.state.filteredJobs[0]
      })
      else
      this.setState({
        displayJobs : ''
      })
    }
  }

  render() {
    let clear = null
    if (this.state.appliedFilters.length > 0) {
      clear = <button onClick={() => { this.filterClear() }} className="btn">Clear All</button>
    }
    var gtJobs = null

    if (this.state.filteredJobs.length === 0) {
      gtJobs = "No Jobs Available"
    }
    else {
      gtJobs = Object.keys(this.state.filteredJobs).map((item, i) => {
        return <div className="card" key={i} onClick={() => { this.display(item) }}>
          <div className="card-body">
            <h5 className="card-title">{this.state.filteredJobs[item].title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.filteredJobs[item].name}</h6>
            <p className="card-text">{this.state.filteredJobs[item].location}</p>
            <p className="card-text">{this.state.filteredJobs[item].job_category}</p>
          </div>
        </div>

      })
    }

    let applyForm = null;

    let displayJobs = this.state.displayJobs;
    // let jobList = Object.keys(this.state.jobs).map((item, i) => (
    //   <div className="card" key={i} onClick={() => { this.display(item) }}>
    //     <div className="card-body">
    //       <h5 className="card-title">{this.props.jobs[item].title}</h5>
    //       <h6 className="card-subtitle mb-2 text-muted">{this.props.jobs[item].name}</h6>
    //       <p className="card-text">{this.props.jobs[item].location}</p>
    //       <p className="card-text">{this.props.jobs[item].job_category}</p>
    //     </div>
    //   </div>

    // ))
    if (this.state.apply === true)
      applyForm = <ApplicationForm jobs={displayJobs} />
    else if (this.state.apply === false)
      applyForm = <div className="alert alert-primary">Already Applied!!</div>
    return <div>

      <Jobs />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form>
              <i className="glyphicon glyphicon-search"></i>
              <input  class="form-control" type="text" onChange={this.jobSearch} placeholder="Enter Job Title or Company Name " />
              </form>
            </div>
            <div className="col-md-6">
              <i className="glyphicon glyphicon-search"></i>
              <input  class="form-control" type="text" onChange={this.jobSearch} placeholder="Enter Location" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div class="btn-group" role="group" style={{ alignItems: "center" }} >
                <button type="button" ref="FT" className={this.state.fullTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="fullTime" onClick={() => { this.changeStatusHandler("FullTime") }}>Full Time</button>
                <button type="button" ref="PT" className={this.state.partTimeStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="partTime" onClick={() => { this.changeStatusHandler("PartTime") }}>Part Time</button>
                <button type="button" ref="IT" className={this.state.internshipStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="internship" onClick={() => { this.changeStatusHandler("Internship") }}>Internship</button>
                <button type="button" ref="OC" className={this.state.onCampusStatus ? 'btn btn-outline-colored' : 'btn btn-outline'} name="onCampus" onClick={() => { this.changeStatusHandler("OnCampus") }}>On Campus</button>
                {clear}
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              {gtJobs}
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{displayJobs.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <Link to={"/displayCompany/" + displayJobs.cid}>{displayJobs.name}</Link>
                  </h6>
                  <p className="card-text">{displayJobs.salary}</p>
                  <p className="card-text">{displayJobs.location}</p>
                  <p className="card-text">{displayJobs.job_category}</p>
                  <p className="card-text">{displayJobs.job_description}</p>
                  <button type="button" onClick={() => this.checkApplied(displayJobs.jid)} className="btn btn-primary">Apply</button>
                  {applyForm}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  }
}
// const mapStateToProps = state => {
//   return {
//     id: state.rootReducer.id,
//     jobs: state.jobReducer.jobs
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getJobs: rootReducer => dispatch(getJobs(rootReducer))
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
export default JobSearch;