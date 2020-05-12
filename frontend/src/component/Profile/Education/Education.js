import React from 'react';
// import axios from 'axios';
import UpdateSchool from './UpdateSchool/UpdateSchool';
import { connect } from 'react-redux';
// import { insertEduc } from '../../../js/actions/profile-action';

class Education extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			update_education: false,
			education: [],
			school_name: '',
			edu_level: '',
			start: '',
			end: '',
			major: '',
			minor: '',
			gpa: '',
			hide_gpa: '',
			cgpa: '',
			hide_cgpa: ''
		}
		this.educationHandler = this.educationHandler.bind(this);
		this.educationChangeHandler = this.educationChangeHandler.bind(this);
		this.insertEdu = this.insertEdu.bind(this);
		// this.update = this.update.bind(this);
	}
	// componentDidMount() {
	//   this.update()
	// }
	// update = () => {
	//   let data = { sid: localStorage.getItem('id') }
	//   axios.post("http://localhost:3001/students/studentEducation", data).then(res => {
	//     console.log(res.data);
	//     this.setState({
	//       education: res.data.education
	//     });
	//   }).catch(e => console.log(e));
	// }
	componentDidUpdate(prevProps, prevState) {
		console.log("EDUCATION : componentDidUpdate CALLED")
		if (prevProps.education !== this.props.education) {
			this.setState({ education: this.props.education })
		}
	}
	educationChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	insertEdu = (e) => {
		e.preventDefault();
		let data = {};
		data.school_name = this.state.school_name
		data.edu_level = this.state.edu_level
		data.start = this.state.start
		data.end = this.state.end
		data.major = this.state.major
		data.minor = this.state.minor
		data.gpa = this.state.gpa
		data.hide_gpa = this.state.hide_gpa
		data.cgpa = this.state.cgpa
		data.hide_cgpa = this.state.hide_cgpa
		data.sid = localStorage.getItem('id');
		console.log(data.sid + localStorage.getItem('id'))
		// axios.post("http://localhost:3001/students/insertEducation", data).then(res => console.log(res.data));
		// this.update();
		// this.props.insertEduc(data)
		this.educationHandler();
	}
	educationHandler = () => {
		if (this.state.update_education === true)
			this.setState({
				update_education: false
			});
		else {
			this.setState({
				update_education: true
			});
		}
	}

	render() {
		let education = null;

		if (this.state.update_education === true) {
			education = <div>
				{this.state.education.map(element => <UpdateSchool key={element._id} item={element} action={this.update} />)}
				<h4>Add School</h4>
				<form onSubmit={this.insertEdu}>
					<div className="form-group">
						<input type="text" name="school_name" placeholder="Enter School Name" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="text" name="edu_level" placeholder="Enter Education Level" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="text" name="start" placeholder="Enter Start" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="text" name="end" placeholder="Enter End" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="text" name="major" placeholder="Enter Major" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="text" name="minor" placeholder="Enter Minor" className="form-control" onChange={this.educationChangeHandler} />
					</div>
					<div className="form-group">
						<input type="number" name="gpa" placeholder="Enter Department GPA" className="form-control" onChange={this.educationChangeHandler} />
					</div>

					<input type="checkbox" name="hide_gpa" onChange={this.educationChangeHandler} /><label>Hide from Employers</label>

					<div className="form-group">
						<input type="number" name="cgpa" placeholder="Enter Cummulative GPA" className="form-control" onChange={this.educationChangeHandler} />
					</div>

					<input type="checkbox" name="hide_cgpa" onChange={this.educationChangeHandler} /><label>Hide from Employers</label>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">Add School</button>
					</div>
				</form>
			</div>
		}
		else {
			education = <div>
				{this.state.education.map((item) =>
					<div className="card" key={item._id} >
						<div className="card-body">
							<h5 className="card-title">{item.school_name}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{item.edu_level}</h6>
							<h6 className="card-subtitle mb-2 text-muted">{item.start}{item.end}</h6>
							<h6 className="card-subtitle mb-2 text-muted">{item.major}</h6>
							<h6 className="card-subtitle mb-2 text-muted">{item.minor}</h6>
							<h6 className="card-subtitle mb-2 text-muted">{item.gpa}</h6>
							<h6 className="card-subtitle mb-2 text-muted">{item.cgpa}</h6>
						</div>
					</div>

				)}
			</div>
		}

		return <div>
			<button onClick={this.educationHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

			<h4>Education</h4>
			<br />
			{education}
		</div>
	}
}
const mapStateToProps = state => {
	return {
		education: state.SProfile.education
	};
};
export default Education;
