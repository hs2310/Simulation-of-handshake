	import React from 'react'
	import { Link } from 'react-router-dom';
	import { getJobs, setApply, checkApply } from '../../js/actions/job-action';
	import { connect } from 'react-redux';
	import ApplicationForm from './ApplicationForm';
	import Jobs from '../Jobs/Jobs';
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
				location: "",
				title: "",
				pageNo: 1,
				limit: 3,
				sort: ""
			}
			this.prev = this.prev.bind(this);
			this.next = this.next.bind(this);
			this.checkApplied = this.checkApplied.bind(this)
			this.changeStatusHandler = this.changeStatusHandler.bind(this)
			this.SelectedFilterArray = this.SelectedFilterArray.bind(this)
			this.jobSearch = this.jobSearch.bind(this)
			this.sortHandler = this.sortHandler.bind(this)
		}
		sortHandler = (e) => {
			console.log("SORT : " + e.target.value)
			this.setState({
				sort: e.target.value
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data)
			})
		}
		prev = () => {
			this.setState({
				pageNo: this.state.pageNo - 1
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data)
			});
		}
		next = () => {
			this.setState({
				pageNo: this.state.pageNo + 1
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data)
			});
		}
		componentDidUpdate(nextProps, nextState) {
			if (nextProps.jobs !== this.props.jobs) {
				this.setState({
					jobs: this.props.jobs,
					filteredJobs: this.props.jobs,
					displayJobs: this.props.jobs[0]
				})
			}
			if (nextProps.apply !== this.props.apply)
				this.setState({ apply: this.props.apply })
		}
		componentDidMount() {
			let data = {
				limit: this.state.limit,
				pageNo: this.state.pageNo,
				filter: this.state.appliedFilters,
				title: this.state.title,
				location: this.state.location,
				sort: this.state.sort
			}
			this.props.getJobs(data);
		}

		filterClear = () => {
			this.setState({
				fullTimeStatus: false,
				partTimeStatus: false,
				onCampusStatus: false,
				internshipStatus: false,
				appliedFilters: [],
				filteredJobs: this.state.jobs
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data);
			})
		}
		display(i) {
			console.log(i)
			this.setState({
				displayJobs: { ...this.state.filteredJobs[i] }
			})
			this.props.setApply('');
		}
		checkApplied(jid) {

			let data = {
				jid: jid,
				sid: localStorage.getItem('id')
			}
			this.props.checkApply(data);

		}
		changeStatusHandler = (e) => {
			console.log(" this.changeStatusHandler called " + e)
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
			console.log(" SelectedFilterArray called ")

			var filters = []
			if (this.state.fullTimeStatus === true) {
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
			this.setState({
				appliedFilters: filters
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data)
			})
		}

		jobSearch = (e) => {
			this.setState({
				[e.target.name]: e.target.value
			}, () => {
				let data = {
					limit: this.state.limit,
					pageNo: this.state.pageNo,
					filter: this.state.appliedFilters,
					title: this.state.title,
					location: this.state.location,
					sort: this.state.sort
				}
				this.props.getJobs(data)
			})
		}

		render() {
			let clear = null
			if (this.state.appliedFilters.length > 0) {
				clear = <button onClick={() => { this.filterClear() }} className="btn">Clear All</button>
			}
			var gtJobs = null
			let displayJobs = null;
			let applyForm = null;

			if (this.state.filteredJobs.length === 0) {
				gtJobs = "No Jobs Available"
				displayJobs = ""
			}
			else {
				gtJobs = Object.keys(this.state.filteredJobs).map((item, i) => {
					return <div className="card" key={i} onClick={() => { this.display(item) }}>
						<div className="card-body">
							<h5 className="card-title">{this.state.filteredJobs[item].title}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{this.state.filteredJobs[item].cid.name}</h6>
							<p className="card-text">Posting Date : {new Date(this.state.filteredJobs[item].posting_date).getMonth() + 1}/{new Date(this.state.filteredJobs[item].posting_date).getDate()}/{new Date(this.state.filteredJobs[item].posting_date).getFullYear()}</p>
							<p className="card-text">Deadline : {new Date(this.state.filteredJobs[item].deadline).getMonth() + 1}/{new Date(this.state.filteredJobs[item].deadline).getDate()}/{new Date(this.state.filteredJobs[item].deadline).getFullYear()}</p>
							<p className="card-text">{this.state.filteredJobs[item].location}</p>
							<p className="card-text">{this.state.filteredJobs[item].job_category}</p>
						</div>
					</div>

				})
				if (this.state.displayJobs) {
					if (this.props.apply === true)
						applyForm = <ApplicationForm jobs={this.state.displayJobs} />
					else if (this.props.apply === false)
						applyForm = <div className="alert alert-primary">Already Applied!!</div>

					displayJobs = <div className="card"><div className="card-body">

						<h5 className="card-title">{this.state.displayJobs.title}</h5>
						<h6 className="card-subtitle mb-2 text-muted">
							<Link to={"/displayCompany/" + this.state.displayJobs.cid._id}>{this.state.displayJobs.cid.name}</Link>
						</h6>
						<p className="card-text">{this.state.displayJobs.salary}</p>
						<p className="card-text">{this.state.displayJobs.location}</p>
						<p className="card-text">{this.state.displayJobs.job_category}</p>
						<p className="card-text">{this.state.displayJobs.job_description}</p>
						<button type="button" onClick={() => this.checkApplied(this.state.displayJobs._id)} className="btn btn-primary">Apply</button>
						{applyForm}
					</div>
					</div>
				}
			}
			return <div>

				<Jobs />
				<div>
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<form>
									<i className="glyphicon glyphicon-search"></i>
									<input class="form-control" name="title" type="text" onChange={this.jobSearch} placeholder="Enter Job Title or Company Name " />
								</form>
							</div>
							<div className="col-md-6">
								<i className="glyphicon glyphicon-search"></i>
								<input class="form-control" name="location" type="text" onChange={this.jobSearch} placeholder="Enter Location" />
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
								<div style={{ width: "100%" }}>
									<button type="button" onClick={this.prev} className="btn btn-primary btn-inverse"> <b>&larr;</b> </button>
									<select name="sort" onChange={this.sortHandler} defaultValue="">
										<option value=""></option>
										<option value="posting_date"> Posting Date - Low To High</option>
										<option value="-posting_date"> Posting Date - High To Low</option>
										<option value="deadline"> Deadline - Low To High</option>
										<option value="-deadline"> Deadline - High To Low</option>
										<option value="location"> Location - A To Z</option>
										<option value="-location"> Location - Z To A</option>
									</select>
									<button type="button" onClick={this.next} style={{ float: "right" }} className="btn btn-primary btn-inverse"> <b>&rarr;</b> </button>
								</div>

							</div>
							<div className="col-md-8">

								{displayJobs}

							</div>
						</div>
					</div>
				</div>
			</div >
		}
	}

	const mapStateToProps = state => {
		return {
			jobs: state.jobs.jobs,
			apply: state.jobs.apply
		};
	};

	export default connect(mapStateToProps, { getJobs, setApply, checkApply })(JobSearch);