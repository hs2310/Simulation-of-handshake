import React from 'react';

import Navigate from '../../Navigate/Navigate';
import { Container, Row, Col } from 'react-bootstrap';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CGeneralInfo from './CGeneralInfo/CGeneralInfo';
import CContactInfo from './CContactInfo/CContactInfo';
import CMyJourney from './CMyJourney/CMyJourney';
// import CProfilePic from './CProfilePic/CProfilePic';
import { connect } from 'react-redux';
// import { getCompany } from '../../../js/actions/Cprofile-action'
class CProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            Info: false
        }
    }
    async componentDidMount() {
        let data = {
            cid: localStorage.getItem("id")
        }

        // await axios.post("http://localhost:3001/company/getCompanyDetails", data).then(res => {
        //     this.setState({
        //         data: res.data,
        //         Info : true
        //     })
        //     console.log(this.state.data)
        // })
        // this.props.getCompany(data);
        this.setState({ data: true })
    }
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        let loading = null;
        // let profilepic = null;
        if (this.state.data) {
            loading = <Container style={{ marginTop: "5%" }}>
                <Row>
                    <Col sm={4} style={style_box}>
                        <CGeneralInfo />
                    </Col>
                    <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                        {/* {profilepic} */}
                        <CMyJourney />
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} style={style_box}>
                        <CContactInfo />
                    </Col>

                </Row>
                {/* <Row>
                <Col sm={4} style={style_box}>
                    <SkillSet />
                </Col>
                <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                    <Experience />
                </Col>
            </Row> */}
            </Container>

            // profilepic = <CProfilePic data = {this.state.data} />
        }
        else if (!this.state.data) {
            loading = <div className="text-center"><br /><br /><br />
        Loading !!!!
      </div>
        }
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
export default CProfile;