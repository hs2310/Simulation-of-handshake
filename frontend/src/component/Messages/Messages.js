import React from 'react';
import axios from 'axios';
import Navigate from '../Navigate/Navigate'
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import {getStudent} from '../../js/actions/profile-action'
class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            reciever: '',
            reciever_name: '',
            message: '',
            list: [],
            name: ''
        };
        this.socket = socketIOClient("http://localhost:3001");
        this.socket.emit("join", localStorage.getItem('id'))
        this.submit = this.submit.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
        this.recieverHandler = this.recieverHandler.bind(this)
        this.display = this.display.bind(this)
    }
    recieverHandler = e => {

        this.setState({
            reciever: e.target.value
        })
    }
    messageHandler = e => {
        this.setState({
            message: e.target.value
        })
    }
    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            this.setState({
                name : this.props.name
            })
        }
    }
    componentDidMount() {
        this.props.getStudent({sid : localStorage.getItem('id')})
        this.socket.on("message", msg => {
            let style = "text-left"
            this.setState({
                res: this.state.res.concat(<div className={style}>{msg.sender}<br />{msg.message}</div>)
            })
        })

        let data = {
            filter: ''
        }
        axios.post("http://localhost:3001/students/getAllStudents", data).then(res => {
            this.setState({
                list: res.data,
                reciever : res.data[0]._id,
                reciever_name :res.data[0].name
            })
            // },() => {
            //     let id = Object.keys(this.state.list).find(key => this.state.list[key]._id === localStorage.getItem("id"))
            //     let list1 = this.state.list
            //     delete list1[id]
            //     this.setState({
            //         list : list1
                    
            //     },()=>{
            //         this.setState({
            //         reciever : this.state.list[0]._id,
            //         reciever_name : this.state.list[0].name
            //         })
            //     })
            // })
        })

    }
    display = i => {
        this.setState({
            reciever : this.state.list[i]._id,
            reciever_name : this.state.list[i].name
        },() => {
            alert(this.state.reciever)
        })
    }
    submit = e => {
        e.preventDefault();

        let packet = {
            sender: localStorage.getItem('id'),
            reciever: this.state.reciever,
            message: { message : this.state.message, timestamp : Date.now() ,sentBy: localStorage.getItem('id') }
        }
        this.setState({
            res: this.state.res.concat(<div className="text-right">{localStorage.getItem('id')}<br />{packet.message}</div>)
        })
        this.socket.emit("message", packet)
        this.setState({ message: '' })
    }
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        let list = Object.keys(this.state.list).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }} style={{ boxShadow: "1px 3px 5px grey" }}>
                <div className="card-body">
                    <img src={this.state.list[item].profile_pic} alt="Oops" className="rounded-circle" height="50px" width="50px" style={{float:"left"}} />
                    <span>{this.state.list[item].name}</span>
                </div>
            </div>
        ))
        return <div>
            <Navigate />
            <Container style={{ marginTop: "5%" }}>
                <Row>
                    <Col sm={4} style={style_box}>
                        {list}
                    </Col>
                    <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                        <div>
        <div className="navbar navbar-expand-sm bg-light navbar-light" style={{ boxShadow: "1px 3px 5px grey", marginBottom : "2%" }}>{this.state.reciever_name}{this.state.reciever}</div>
                            {this.state.res}
                        </div>
                        <form onSubmit={this.submit}>
                            <div className="form-group">                                
                                <input type="text" name="message" onChange={this.messageHandler} value={this.state.message} className="form-control-inline" />
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </Col>
                </Row>


            </Container>

        </div>
    }
}
const mapStateToProps = state => {
    return {
        name : state.SProfile.name
    }
}
export default connect(mapStateToProps , {getStudent})(Messages);