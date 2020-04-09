import React from 'react'
// import axios from 'axios';
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
import { connect } from 'react-redux';
// import store from '../../js/store/index';
import { getStudent } from '../../js/actions/profile-action'
// import {rootReducer} from '../../js/reducers/index'
// import {store} from '../../js/store/index'
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: false,
      skills: '',
      education: [],
      experience: [],
      update_general_info: false,
      update_my_Journey: false,
      update_education: false,
      update_contact: false,
      update_experience: false,
      dob: ''
    };
    this.myJourneyHandler = this.myJourneyHandler.bind(this);
    // this.update =  this.update.bind(this);
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


  async componentDidMount() {
    //update();
    //  console.log("ID:"+JSON.stringify(store.getState()))
    //  await this.props.getStudentData({id : this.props.id});
    //  this.update();
    await this.props.getStudent({ "sid": localStorage.getItem("id") })
    await this.setState({ data: true })

  }
  render() {
    let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
    let loading = null;
    if (this.state.data)
      loading = <Container style={{ marginTop: "5%" }}>
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
            <ContactInfo action={this.update} />
          </Col>
          <Col sm={{ span: 7, offset: 1 }} style={style_box}>
            <Education education={this.state.education} />
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
      </Container>;
    else if (!this.state.data)
      loading = <div className="text-center"><br /><br /><br />
        Loading !!!!
      </div>

    if (!localStorage.getItem('id')) {
      return <Redirect to="/" />
    }
    else {
      return <div>
        <Navigate />
        {loading}

        {/* {this.state.skills}
        {this.state.education}
        {this.state.experience} */}
      </div>
    }
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//       getStudentData: (rootReducer) => dispatch(getStudentData(rootReducer))
//   };
// }
export default connect(null, { getStudent })(Profile);
// export default Profile;