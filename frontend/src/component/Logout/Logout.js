import React from 'react';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
// import * as bs from 'react-bootstrap';
// import {connect} from 'react-redux';
// import { logout } from '../../js/actions/index';
class Logout extends React.Component {
//   constructor(props){
//     super(props)
//   }
    componentDidMount(){
        // cookie.remove("cookie",{path : '/'})
        localStorage.removeItem('jwt')
        localStorage.removeItem('id')
        localStorage.removeItem('type')
        // this.props.logout();
    }
  render() {   
    return <Redirect to="/"/>
    
  }
}
// const mapStateToProps = state => {

//   return { 
//       id: state.id,
//       type: state.type,
//       authFlag: state.type,
//       error : state.error
//   };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         logout: rootReducer => dispatch(logout(rootReducer))
//     };
// }

export default Logout;