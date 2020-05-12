import React from 'react';
import { connect } from 'react-redux';
// import { updateJourney } from '../../../../js/actions/Cprofile-action'


class CMyJourney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_journey: false,
            description: ''
        }
        this.myJourneyHandler = this.myJourneyHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("MY JOURNEY  : componentDidUpdate CALLED")
        if (prevProps.description !== this.props.description) {
          this.setState({ description : this.props.description})
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
        let data = this.state;
        data.cid = localStorage.getItem("id");
        console.log(this.state);
        // axios.post("http://localhost:3001/company/UpdateCompanyJourney", data).then(res => console.log(res.data));
        // this.props.updateJourney(data);
        // this.props.action();
        this.myJourneyHandler();
    }

    render() {
        let myJourney = null;
        if (this.state.update_journey === true) {
            myJourney = <div>
                <form onSubmit={this.updateInfo}>
                    <div>
                        <div className="form-group">
                            <textarea name="description" placeholder="Enter your Journey" className="form-control" defaultValue={this.props.description} onChange={this.educationChangeHandler}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        }
        else {
            myJourney = <div>{this.props.description}</div>;
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
        description : state.CProfile.description
    }
    
}
export default CMyJourney;
