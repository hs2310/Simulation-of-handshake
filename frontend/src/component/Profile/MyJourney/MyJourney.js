import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import { updateJourney } from '../../../js/actions/profile-action'
class MyJourney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_journey: false,
            objective: ''
        }
        this.myJourneyHandler = this.myJourneyHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("MY JOURNEY : componentDidUpdate CALLED")
        if (prevProps.objective !== this.props.objective) {
          this.setState({ objective : this.props.objective})
        }
      }
    myJourneyHandler = () => {
        if (this.state.update_journey === true)
            this.setState({
                update_journey: false
            });
        else {
            this.setState({
                update_journey: true
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
        let data = {};
        data.objective = this.state.objective;
        data.sid = localStorage.getItem('id')
        this.props.updateJourney(data);
        this.myJourneyHandler();
    }

    render() {
        let myJourney = null;
        if (this.state.update_journey === true) {
            myJourney = <div>
                <form onSubmit={this.updateInfo}>
                    <div>
                        <div className="form-group">
                            <textarea name="objective" placeholder="Enter your Journey" className="form-control" defaultValue={this.state.objective} onChange={this.educationChangeHandler}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        }
        else {
            myJourney = <div>{this.state.objective}</div>;
        }
        return <div>
            <button onClick={this.myJourneyHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>
            <h4>My Journey</h4>
            {myJourney}
        </div>
    }
}
const mapStateToProps = state => {

    return { 
        objective: state.SProfile.objective
    };
  };
  export default connect(mapStateToProps , {updateJourney}) (MyJourney);