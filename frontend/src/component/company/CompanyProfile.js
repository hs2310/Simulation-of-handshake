import React from 'react';
// import cookie from 'react-cookies';
// import { useParams } from 'react-router-dom';
// import * as bs from 'react-bootstrap';
// import {connect} from 'react-redux';
import axios from 'axios';
import Navigate from '../Navigate/Navigate'
// import { logout } from '../../js/actions/index';
import {Container , Row , Col} from 'react-bootstrap';
class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: 'HAR',
            description: 'S'
        }
    }
    // static propTypes = {
    //     match: PropTypes.object.isRequired,

    //   };
    componentDidMount(){     
        let data ={
            cid :  this.props.match.params.id
        }
        // console.log(this.props.match.params);
        // const { match: { params } } = this.props;
        axios.post("http://localhost:3001/company/getCompanyDetails",data).then(
           res=>{ 
                console.log(res.data[0])   
            this.setState({
                name : res.data[0].name,
                description : res.data[0].description,
                email : res.data[0].email,
                location : res.data[0].location,
                mob : res.data[0].mob,
                profile_pic : res.data[0].profile_pic
            })
        })
    }
    render(){
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        return <div>
            <Navigate />
                <Container style={{ marginTop: "5%" }}>
                    <Row>
                        <Col sm={4} style={style_box}>
                        <h4>General Information</h4>
                            <img src={this.state.profile_pic} alt ="Not Uploaded!!!" className="rounded-circle" height="100px" width="100px" style={{float: 'left'}}/>
                            <h4>{this.state.name}</h4>
                            <p>
                                {this.state.location}
                            </p>
                        </Col>
                        <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                            {/* {profilepic} */}
                            <h4>Journey</h4>
                            <p>
                                {this.state.description}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} style={style_box}>
                        <h4>Contact Info</h4>
                            Mob : {this.state.mob}<br />
                            Email :  {this.state.email}
                        </Col>
                        
                    </Row>
                </Container>
            {/* {this.props.match.params.id}<br/>
            {this.state.name}<br/>
            {this.state.description}<br/>
            {this.state.email}<br/>
            {this.state.location}<br />
            {this.state.mob} <br/>
            {this.state.profile_pic} */}
        </div>   
    }
}
// const mapStateToProps = state => {
//     return {
//         id: state.rootReducer.id,
//         jobs: state.jobReducer.jobs
//     };
// };

export default CompanyProfile;