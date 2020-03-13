import React from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';
class SkillSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_skill: false,
            skillSet: [],
            skill: [],
            selectSkill: '',
            msg:''
        }
        this.skillHandler = this.skillHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    update = () => {
        
        let data = { sid: localStorage.getItem('id') }
        axios.post("http://54.86.64.9:3001/studentSkills", data).then(res => {
            this.setState({
                skillSet: res.data,
            });
            console.log(this.state.skillSet)
        })
        console.log(this.state.skillSet)
        axios.post("http://54.86.64.9:3001/getSkills", data).then(res => {
            this.setState({
                skill: res.data
            });

            console.log(this.state.skill)

        })
    }
    async componentDidMount() {
        //console.log("ID : " + this.props.id)
        await this.update()
    }
    skillHandler = () => {
        this.setState({msg :''}) 
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
        this.setState({msg :''})
        let data = this.state;
        data.sid = localStorage.setItem('id');
        let flag = 0;
        this.state.skillSet.forEach(x => {

            if (x.skid === Number(data.selectSkill)) {
                flag = 1;
            }
        })
        
        if (flag === 1)
            this.setState({msg :<div className="alert alert-danger">"Skill already exists"</div>})
        else {
            console.log(this.state);
            axios.post("http://54.86.64.9:3001/UpdateSkill", data).then(res => {
                console.log(res.data)
            });
            this.update();
            // this.props.action();
            this.skillHandler();
        }
    }
    deleteSkill = (id) => {
        let data = { "id": id }
        axios.post("http://54.86.64.9:3001/DeleteSkill", data).then(res => console.log(res.data));
        this.update();
        // this.props.action();
        this.skillHandler();
    }
    render() { 
        let skill = null;
        
        if (this.state.update_skill === true) {
            skill = <div>
                <div>{this.state.skillSet.map(item => <div key={item.id}>{item.name}<button type="button" onClick={() => { this.deleteSkill(item.id) }}>X</button></div>)}</div>
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <select name="selectSkill" className="form-control" onChange={this.educationChangeHandler}>
                            <option value=""></option>
                            {this.state.skill.map(item =>
                                <option key={item.skid} value={item.skid}>{item.name}</option>
                            )
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        }
        else {
            skill = <div>{this.state.skillSet.map(item => <div key={item.id}>{item.name}</div>)}</div>
        }
        return <div>
            <button onClick={this.skillHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Skill Set</h4>
            {this.state.msg}
            {skill}
        </div>
    }
}
// const mapStateToProps = state => {

//     return { 
//         id: state.rootReducer.id,
//         type: state.rootReducer.type
//     };
//   };
  export default SkillSet;