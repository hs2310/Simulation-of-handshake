import React from 'react';
import axios from 'axios';
import Navigate from '../Navigate/Navigate'
import { Container, Row, Col } from 'react-bootstrap';
class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'HAR',
            description: 'S'
        }
    }
    render() {
        let response = {};
        if (this.props.data.commpany) {
            response = this.props.data.company;
        }
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        return <div>
            <Navigate />
            <Container style={{ marginTop: "5%" }}>
                <Row>
                    <Col sm={4} style={style_box}>
                        <h4>General Information</h4>
                        <img src={this.state.profile_pic} alt="Not Uploaded!!!" className="rounded-circle" height="100px" width="100px" style={{ float: 'left', marginRight: "2%" }} />
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

        </div>
    }
}

export default graphql(company, { name: "company" })(CompanyProfile);