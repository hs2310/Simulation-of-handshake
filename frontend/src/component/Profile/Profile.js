import React from 'react'
import axios from 'axios';
import Navigate from "../Navigate/Navigate"
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Experience from './experience/experience';
import Education from './Education/Education';
import GeneralInfo from './GeneralInfo/GeneralInfo';
import ContactInfo from './ContactInfo/ContactInfo'
import MyJourney from './MyJourney/MyJourney';
import SkillSet from './SkillSet/SkillSet';
// import {connect} from 'react-redux';
// import store from '../../js/store/index';
// import {getStudentData} from '../../js/actions/profile-action'
// import {rootReducer} from '../../js/reducers/index'
// import {store} from '../../js/store/index'
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      skills: '',
      education: [],
      experience: [],
      update_general_info: false,
      update_my_Journey:  false,
      update_education: false,
      update_contact: false,
      update_experience: false,
      dob: ''
    };
    this.myJourneyHandler = this.myJourneyHandler.bind(this);
    // this.update =  this.update.bind(this);
  }
  update =() => {
    // e.preventDefault();
    // console.log("ID:"+JSON.stringify(store.getState()))
      let data = {
        sid: localStorage.getItem('id')
      }
      // axios.post("http://localhost:3001/studentData", data).then(res => {
      //   this.setState({
      //     data: res.data[0]
      //   });
      //   console.log(this.state.data)
        
      // }).catch(e => console.log(e));
      axios.post("http://localhost:3001/studentSkills", data).then(res => {
        this.setState({
          skills : res.data[0]
        });
      }).catch(e => console.log(e));
    // axios.post("http://localhost:3001/studentEducation", data).then(res => {
    //   this.setState({
    //     education : res.data
    //   });
    // }).catch(e => console.log(e));
    // axios.post("http://localhost:3001/studentExperience", data).then(res => {
    // // this.state.experience.push(res.data)  
    // this.setState({
    //     experience : res.data
    //   });      
    // }).catch(e => console.log(e));
  }
 
  myJourneyHandler = () => {
    if (this.state.update_my_Journey === true)
      this.setState({
        update_my_Journey: false
      });
    else {
      this.setState({
        update_my_Journey: true
      });
    }
  }
  
 
  componentDidMount() {
     //update();
    //  console.log("ID:"+JSON.stringify(store.getState()))
    //  await this.props.getStudentData({id : this.props.id});
     this.update();
  }
  render() {
    let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
    
    if (!localStorage.getItem('id')) {
      return <Redirect to="/" />
    }
    else {
      return <div>
        <Navigate />
        <Container style={{ marginTop: "5%" }}>
          <Row>
            <Col sm={4} style={style_box}>
              <GeneralInfo action={this.update} />  
            </Col>
            <Col sm={{ span: 7, offset: 1 }} style={style_box}>
              <MyJourney />
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={style_box}>
              <ContactInfo action={this.update}/>
            </Col>
            <Col sm={{ span: 7, offset: 1 }} style={style_box}>
            <Education education  = {this.state.education}  />
            </Col>
          </Row>
          <Row>
            <Col sm={4} style={style_box}>
              <SkillSet />
            </Col>
            <Col sm={{ span: 7, offset: 1 }} style={style_box}>
              <Experience />
           </Col>
          </Row>
        </Container>

        {/* {this.state.skills}
        {this.state.education}
        {this.state.experience} */}
      </div>
    }
  }
}

// const mapStateToProps = state => {

//   return { 
//       id: state.rootReducer.id,
//       data: state.profileReducer.data,
//       skills: state.profileReducer.skills,
//       skillSet:state.profileReducer.skillSet,
//       experience:state.profileReducer.experience,
//       education:state.profileReducer.education
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//       getStudentData: (rootReducer) => dispatch(getStudentData(rootReducer))
//   };
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Profile);
export default Profile;