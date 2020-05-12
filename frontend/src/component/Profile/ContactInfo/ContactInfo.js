import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
// import store from '../../js/store/index';
// import { updateConInfo } from '../../../js/actions/profile-action'
// import {connect} from 'react-redux';
class ContactInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_contact_info: false,
            mob: '',
            email:''
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
    componentDidUpdate(prevProps, prevState) {
        console.log("CONTACT INFO : componentDidUpdate CALLED")
        if (prevProps.email !== this.props.email) {
          this.setState({ email : this.props.email})
        }
        if (prevProps.mob !== this.props.mob) {
          this.setState({ mob : this.props.mob})
        }
      }
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
            email : this.state.email,
            mob : this.state.mob,
            sid : localStorage.getItem('id')
        }
        
        
        // this.props.updateConInfo(data)
        
        this.contactInfoHandler();
    }

    render() {
        let contactInfo = null;
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
            contactInfo = <div>{this.props.mob}<br/>{this.props.email}</div>;
        }
        return <div>
            <button onClick={this.contactInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Contact Information</h4>

            {contactInfo}
        </div>
    }
}
const mapStateToProps = state => {

    return { 
        email: state.SProfile.email,
        mob: state.SProfile.mob
    };
  };
export default ContactInfo;