import React, { Component } from 'react';
import './App.css';
//import Main from './components/Main';
// import {BrowserRouter} from 'react-router-dom';
import Login from './component/Login';
import Register from './Register/Register';
import {Route} from 'react-router-dom';
import Home from './component/Home';
//Main Component
class Main extends Component {
  
 
  render() {
    
    return (
        <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Home}/> 
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        {/* <Route path="/home" component={Home}/>
        <Route path="/delete" component={Delete}/>
        <Route path="/create" component={Create}/> */}

    </div>
    );
  }
}
export default Main;
