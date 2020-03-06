import React from 'react';
import axios from 'axios';
import Navigate from '../../Navigate/Navigate';
import {Container , Row , Col} from 'react-bootstrap';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import CGeneralInfo from './CGeneralInfo/CGeneralInfo';
import CContactInfo from './CContactInfo/CContactInfo';
import CMyJourney from './CMyJourney/CMyJourney';
class CProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            Info : false
        }
    }
    async componentDidMount() {
        let data = {
            cid: localStorage.getItem("id")
        }

        await axios.post("http://localhost:3001/getCompanyDetails", data).then(res => {
            this.setState({
                data: res.data[0],
                Info : true
            })
            console.log(this.state.data)
        })
    }
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        let generalInfo = null;
        let contactInfo = null;
        let myJourney = null;

        if(this.state.Info)
        {    
            generalInfo = <CGeneralInfo data ={this.state.data}/> 
            contactInfo = <CContactInfo data = {this.state.data} />
            myJourney = <CMyJourney data = {this.state.data} />
        }
        if (!cookie.load('cookie')) {
            return <Redirect to="/" />
        }
        else {
            return <div>
                <Navigate />
                <Container style={{ marginTop: "5%" }}>
                    <Row>
                        <Col sm={4} style={style_box}>
                            {generalInfo}
                        </Col>
                        <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                            {myJourney}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} style={style_box}>
                            {contactInfo}
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

                {/* {this.state.skills}
        {this.state.education}
        {this.state.experience} */}
            </div>
        }
    }
}
export default CProfile;