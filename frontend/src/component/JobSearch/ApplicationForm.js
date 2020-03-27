import React from 'react'
import axios from 'axios';
class ApplicationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            loaded: 0
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        // this.fileUpload =  this.fileUpload.bind(this)
    }
    componentDidMount() {
        // alert(this.props.cid)
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
        const url = 'http://localhost:3001/applyJobs';
        const formData = new FormData();
        formData.append('file', this.state.selectedFile)
        formData.append('jid', this.props.jobs.jid)
        formData.append('sid', localStorage.getItem('id'))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url,formData,config).then((response)=>{
            console.log(response.data);
            alert("Applied")
          })
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
                </div>
            </div>
        
    }
}

export default ApplicationForm;