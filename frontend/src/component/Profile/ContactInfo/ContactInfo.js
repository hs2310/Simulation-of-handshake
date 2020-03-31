import React from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';
class ContactInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_contact_info: false,
            data: '',
            mob:'',
            email:''
        }
        this.contactInfoHandler = this.contactInfoHandler.bind(this);
        this.educationChangeHandler = this.educationChangeHandler.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }
    async componentDidMount() {
        let data = { sid: localStorage.getItem('id'), call: 'contact' }
        await axios.post("http://localhost:3001/students/studentData", data).then(res => {
            this.setState({
                data: res.data,
                email: res.data.email,
                mob: res.data.mob
            });
            console.log(this.state.data)

        }).catch(e => console.log(e));
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
        let data = this.state;
        data.sid = localStorage.getItem('id');
        console.log(this.state);
        axios.post("http://localhost:3001/students/UpdateContactInfo", data).then(res => console.log(res.data));
        
        this.contactInfoHandler();
    }

    render() {
        let contactInfo = null;
        if (this.state.update_contact_info === true) {
            contactInfo = <div>
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <input type="tel" name="mob" placeholder="Enter your mob" className="form-control" defaultValue={this.state.mob} onChange={this.educationChangeHandler} />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Enter your Email" className="form-control" defaultValue={this.state.email} onChange={this.educationChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        }
        else {
            contactInfo = <div>{this.state.mob}<br/>{this.state.email}</div>;
        }
        return <div>
            <button onClick={this.contactInfoHandler} className="btn btn-primary" style={{ float: "right" }} type="button">edit</button>

            <h4>Contact Information</h4>

            {contactInfo}
        </div>
    }
}
// const mapStateToProps = state => {

//     return { 
//         id: state.rootReducer.id,
//         type: state.rootReducer.type
//     };
//   };
  export default ContactInfo;