import React from 'react';
import { compose, graphql } from 'react-apollo'

class ContactInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_contact_info: false,
            mob: '',
            email: ''
        }
        this.contactInfoHandler = this.contactInfoHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    // async componentDidMount() {
    //     this.setState({
    //         mob : this.props.mob,
    //         email : this.props.email
    //     })
    // }
    contactInfoHandler = () => {
        if (this.state.update_contact_info === true)
            this.setState({
                update_contact_info: false
            });
        else {
            this.setState({
                update_contact_info: true
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
        let data = {
            email: this.state.email,
            mob: this.state.mob,
            sid: localStorage.getItem('id')
        }
        let mutationResponse = this.props.updateContactInfo({
            variables = {
                id: data.sid,
                email: data.email,
                mob: data.mob
            }
        });
        if (mutationResponse.data.status === "200") {
            this.setState({
                update_contact_info: false
            })
        }

    }

    render() {
        let contactInfo = null;
        let response = {};

        if (this.state.update_contact_info === true) {
            contactInfo = <div>
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <input type="tel" name="mob" placeholder="Enter your mob" className="form-control" defaultValue={this.props.mob} onChange={this.educationChangeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Enter your Email" className="form-control" defaultValue={this.props.email} onChange={this.educationChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        }
        else {
            contactInfo = <div>{this.props.mob}<br />{this.props.email}</div>;
        }
        return <div>
            <button onClick={this.contactInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Contact Information</h4>

            {contactInfo}
        </div>
    }
}
export default compose(graphql(updateContactInfo, { name: "updateContactInfo" })(ContactInfo));
