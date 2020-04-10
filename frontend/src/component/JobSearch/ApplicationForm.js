import React from 'react'
// import axios from 'axios';
import {connect} from 'react-redux';
import { apply , setApplied } from '../../js/actions/job-action' 
class ApplicationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            loaded: 0,
            applied : ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        // this.fileUpload =  this.fileUpload.bind(this)
    }
    componentDidUpdate(nextProps , nextState) {
        if(nextProps.applied !== this.props.applied)
        this.setState({applied : this.props.applied})
    }
    componentDidMount(){
        this.props.setApplied("");
    }
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
        console.log(event.target.files[0])
    }
    onSubmitHandler = e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile)
        formData.append('jid', this.props.jobs._id)
        formData.append('sid', localStorage.getItem('id'))
        this.props.apply(formData);
    }
    // fileUpload() 
    // {
    //     // e.preventDefault();
    //     alert("Handler called")
    //     // const data = new FormData()
    //     // data.append('file', this.state.selectedFile)
    //     // data.append('jid', this.props.jobs.jid)
    //     // data.append('sid', 1)
    //     // axios.post("http://localhost:3001/applyJobs", data, {
    //     //     headers: {
    //     //         'content-type': 'multipart/form-data'
    //     //     }
    //     // });
        
    //     return post(url, formData, config)
    // }
    render() {
        return <div className="card" >
                <div className="card-body">
                <form onSubmit={this.onSubmitHandler}>
                    <input type="hidden" name="jid" value={this.props.jobs.jid} />
                    <input type="hidden" name="sid" value="1" />
                    <div className="form-group">
                        <input type="file" name="resume" className="form-control" onChange={this.onChangeHandler} />
                    </div>
                    <button className="btn btn-primary" >Upload</button>
                </form>
                {this.state.applied}
                </div>
            </div>
        
    }
}
const mapStateToProps = state => {
    return{
        applied : state.jobs.applied
    }
}
export default connect( mapStateToProps,{apply , setApplied})(ApplicationForm);