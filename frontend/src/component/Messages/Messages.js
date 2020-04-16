import React from 'react';
import axios from 'axios';
import Navigate from '../Navigate/Navigate'
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudent } from '../../js/actions/profile-action'
import { getCompany } from '../../js/actions/Cprofile-action'
import { connect } from 'react-redux';
import { getPostedMessages } from '../../js/actions/message-action'
class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: '',
            reciever: '',
            reciever_name: '',
            message: '',
            list: [],
            name: ''
        };
        this.socket = socketIOClient("http://54.158.111.198:3001");
        this.socket.emit("join", localStorage.getItem('id'))
        this.submit = this.submit.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
        this.recieverHandler = this.recieverHandler.bind(this)
        this.display = this.display.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }
    scrollToBottom = () => {
        this.node.scrollIntoView({ behavior: "smooth" });
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
    componentDidUpdate(prevProps , prevState) {
        if (prevProps.list !== this.props.list) {
            let l = this.props.list
            let list1 = []
            for (let i = 0; i < l.length; i++) {
                let index = l[i].users.indexOf(localStorage.getItem('id'))
                if (index === 0) index = 1;
                else index = 0;
                let data = { user: l[i].users[index], name: l[i].name[index] }
                list1.push(data)
            }
            this.setState({
                list: list1
            }, () => {
                if (this.props.match!== undefined) {
                    this.setState({
                        reciever: this.props.match.params.id,
                        reciever_name: this.props.match.params.name
                    },() => {
                        let flag = false;
                        let list2 = this.state.list
                        list2.forEach(k => {
                            if(k.user === this.state.reciever){
                                flag = true;
                            }
                        })
                        if(!flag){
                            let data = { user :this.state.reciever , name : this.state.reciever_name}
                            list2.push(data)
                            this.setState({
                                list : list2
                            })
                        } else {
                            let data = {
                                user1: localStorage.getItem('id'),
                                user2: this.state.reciever
                            }
                            axios.post("http://54.158.111.198:3001/getMessages", data).then(res => {
                                this.setState({
                                    res: res.data.messages
                                })
                                this.scrollToBottom();
                            })
                        }
                    })
                } else {
                    if(this.state.list.length > 0){
                        this.setState({
                            reciever_name: this.state.list[0].name,
                            reciever: this.state.list[0].user,
                            res: res.data[0].messages
                        })
                        this.scrollToBottom();
                    }
                }
            })
        }
        this.scrollToBottom(    )
    }
    componentWillMount(){
        if(localStorage.getItem("type") === "student")
            this.props.getStudent({ sid: localStorage.getItem('id') })
        else
            this.props.getCompany({cid : localStorage.getItem('id')})
    }
    componentDidMount() {

        
        this.socket.on("message", msg => {
            this.setState({
                res: ''
            })
            console.log("MSG : ", msg)
            function equals(a, b) {
                if (a.length !== b.length) {
                    return false;
                }

                var seen = {};
                a.forEach(function (v) {
                    var key = (typeof v) + v;
                    if (!seen[key]) {
                        seen[key] = 0;
                    }
                    seen[key] += 1;
                });

                return b.every(function (v) {
                    var key = (typeof v) + v;
                    if (seen[key]) {
                        seen[key] -= 1;
                        return true;
                    }
                    // not (anymore) in the map? Wrong count, we can stop here
                });
            }
            let u = [localStorage.getItem('id'), this.state.reciever]

            let u1 = msg.users


            if (equals(u, u1)) {

                this.setState({
                    res: msg.messages
                })
                this.scrollToBottom();
                console.log(this.state.res)
            }
        })

        let data = {
            id: localStorage.getItem('id')
        }
        this.props.getPostedMessages(data)
        axios.post("http://54.158.111.198:3001/getPostedMessages", data).then(res => {
       
        })
        this.scrollToBottom();
    }
    display = i => {
        this.setState({
            reciever: this.state.list[i].user,
            reciever_name: this.state.list[i].name
        }, () => {
            let data = {
                user1: localStorage.getItem('id'),
                user2: this.state.reciever
            }
            axios.post("http://54.158.111.198:3001/getMessages", data).then(res => {
                this.setState({
                    res: res.data.messages
                })
            })
            this.scrollToBottom();
        })
        
    }
    submit = e => {
        e.preventDefault();
        
        if(localStorage.getItem("type") === "student"){
            let packet = {
                sender: localStorage.getItem('id'),
                reciever: this.state.reciever,
                names: [this.props.name, this.state.reciever_name],
                message: { msg: this.state.message, timestamp: Date.now(), sentBy: localStorage.getItem('id') }
            }
    
            this.socket.emit("message", packet)
            this.setState({ message: '' })
        }else{
            let packet = {
                sender: localStorage.getItem('id'),
                reciever: this.state.reciever,
                names: [this.props.nameC, this.state.reciever_name],
                message: { msg: this.state.message, timestamp: Date.now(), sentBy: localStorage.getItem('id') }
            }
    
            this.socket.emit("message", packet)
            this.setState({ message: '' })
        }
        
    }
    render() {
        let style_box = { boxShadow: "1px 3px 5px grey", padding: "2%" };
        let list = Object.keys(this.state.list).map((item, i) => (
            <div className="card" key={i} onClick={() => { this.display(item) }} style={{ boxShadow: "1px 3px 5px grey" }}>
                <div className="card-body">
                    <span>{this.state.list[item].name}</span>
                </div>
            </div>
        ))
        let res = null;
        if (this.state.res) {
            res = Object.keys(this.state.res).map((item, i) => {
                if (this.state.res[item].sentBy === localStorage.getItem('id'))
                    return <div className="text-right">{this.state.res[item].msg}<br/> <span style={{fontSize: ".9em"}}>{new Date(this.state.res[item].timestamp).getMonth()+1}/{new Date(this.state.res[item].timestamp).getDate()}/{new Date(this.state.res[item].timestamp).getFullYear()} {new Date(this.state.res[item].timestamp).getHours()}:{new Date(this.state.res[item].timestamp).getMinutes()}</span></div>
                else
                    return <div className="text-left">{this.state.res[item].msg}<br/><span style={{fontSize: ".9em"}}>{new Date(this.state.res[item].timestamp).getMonth()+1}/{new Date(this.state.res[item].timestamp).getDate()}/{new Date(this.state.res[item].timestamp).getFullYear()} {new Date(this.state.res[item].timestamp).getHours()}:{new Date(this.state.res[item].timestamp).getMinutes()}</span></div>
            })
        }
        return <div>
            <Navigate />
            <Container style={{ marginTop: "5%" }}>
                <Row>
                    <Col sm={4} style={style_box}>
                        {list}
                    </Col>
                    <Col sm={{ span: 7, offset: 1 }} style={style_box}>
                        <div> 
                            <div className="navbar navbar-expand-sm bg-primary navbar-light " style={{ boxShadow: "1px 3px 5px grey", marginBottom: "2%" }}><span className="text-light"><strong>{this.state.reciever_name}</strong></span></div>
                            <div style={{height: "25em" ,overflowY: "scroll", padding: "2%"}}>{res}<div ref={(node) => { this.node = node; }}></div></div>
                        </div>
                        <form onSubmit={this.submit}>
                            <div className="form-group" style={{width:"100%"}}>
                            
                                <input type="text" name="message" onChange={this.messageHandler} value={this.state.message} className="form-control" style={{ boxShadow: "1px 3px 5px grey", padding: "2%", width : "89.5%", display : "inline"}}/>
                                <button className="btn btn-primary" style={{boxShadow: "1px 3px 5px grey"}}>Send</button>    
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
        name: state.SProfile.name,
        nameC : state.CProfile.name,
        list : state.msg.list
    }
}
export default connect(mapStateToProps, { getStudent,getCompany , getPostedMessages })(Messages);