import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
// import { deleteSkil , updateSkil } from '../../../js/actions/profile-action'
class SkillSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_skill: false,
            skillSet: [],
            skill: [],
            selectSkill: '',
            msg: ''
        }
        this.skillHandler = this.skillHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        // this.update = this.update.bind(this);
    }
    // update = () => {

    //     let data = { sid: localStorage.getItem('id') }
    //     axios.post("http://localhost:3001/students/studentSkills", data).then(res => {
    //         this.setState({
    //             skillSet: res.data,
    //         });
    //         console.log(this.state.skillSet)
    //     })
    
    // }
    // componentDidMount() {
    //     //console.log("ID : " + this.props.id)
    //     this.update()
    // }
    componentDidUpdate(prevProps, prevState) {
        console.log("SKILLS : componentDidUpdate CALLED")
        if (prevProps.skills !== this.props.skills) {
          this.setState({ skillSet : this.props.skills})
        }
      }
    skillHandler = () => {
        this.setState({ msg: '' })
        if (this.state.update_skill === true)
            this.setState({
                update_skill: false
            });
        else {
            this.setState({
                update_skill: true
            });
        }
    }
    educationChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateInfo = (e) => {

        e.preventDefault();
        this.setState({ msg: '' })
        let data = {name : this.state.selectSkill};
        data.sid = localStorage.getItem('id');
        var flag = 0;
        this.state.skillSet.forEach(x => {

            if (x.name === data.name) {
                flag = 1;
            }
        })

        if (flag === 1)
            this.setState({ msg: <div className="alert alert-danger">"Skill already exists"</div> })
        else {
            // console.log(this.state);
            // axios.post("http://localhost:3001/students/UpdateSkill", data).then(res => {
            //     // console.log(res.data)
            //     axios.post("http://localhost:3001/students/studentSkills", data).then(res => {
            //         this.setState({
            //             skillSet: res.data
            //         });
            //         // console.log(this.state.skillSet)
            //     })
            // });
            // this.update();
            // this.props.action();
            
            // this.props.updateSkil(data)
            
            this.skillHandler();
        }
    }
    deleteSkill = (id) => {
        let data = { id: id }
        data.sid = localStorage.getItem('id')
        // axios.post("http://localhost:3001/students/DeleteSkill", data).then(res => {
        //     axios.post("http://localhost:3001/students/studentSkills", data).then(res => {
        //         this.setState({
        //             skillSet: res.data
        //         });
        //         // console.log(this.state.skillSet)
        //     })
        // });
        // this.update();
        // this.props.action();
        // this.props.deleteSkil(data)
        this.skillHandler();
    }
    render() {
        let skill = null;

        if (this.state.update_skill === true) {
            skill = <div>
                <div>{this.state.skillSet.map(item => <div key={item._id}>{item.name}<button type="button" onClick={() => { this.deleteSkill(item._id) }}>X</button></div>)}</div>
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <input type="text" name="selectSkill" className="form-control" onChange={this.educationChangeHandler}/>
                    </div>    
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        }
        else {
            skill = <div>{this.state.skillSet.map(item => <div key={item._id}>{item.name}</div>)}</div>
        }
        return <div>
            <button onClick={this.skillHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Skill Set</h4>
            {this.state.msg}
            {skill}
        </div>
    }
}
const mapStateToProps = state => {

    return { 
        skills: state.SProfile.skills
    };
  };
export default SkillSet;