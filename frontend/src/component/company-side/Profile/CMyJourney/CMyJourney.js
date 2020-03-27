import React from 'react';
import axios from 'axios';

class CMyJourney extends React.Component {
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
    componentDidMount() {
            this.setState({
                cid: this.props.data.cid,
                objective: this.props.data.description
            });
            
        // alert(this.props.id)
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
        data.cid = this.props.data.cid;
        console.log(this.state);
        axios.post("http://localhost:3001/UpdateCompanyJourney", data).then(res => console.log(res.data));
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
export default CMyJourney;