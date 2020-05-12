import React, { Component } from 'react';

//import Main from './components/Main';
// import {BrowserRouter} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile'
// import Navigate from './Navigate/Navigate'
// import Register from './Register/Register';
// import Jobs from './Jobs/Jobs'
import {Switch,Route} from 'react-router-dom';
import JobSearch from './JobSearch/JobSearch';
import CompanyProfile from './company/CompanyProfile';
import StudentApplication from './StudentApplication/StudentApplication';
import StudentDetails from './StudentDetails/StudentDetails';
import StudentProfile from './StudentProfile/StudentProfile';
import CProfile from './company-side/Profile/Profile';
import CJobSearch from './company-side/CJobSearch/CJobSearch';
import CStudentApplications from './company-side/CStudentApplications/CStudentApplications';
// import Events from './Event/Event';
// import CEvents from './company-side/CEvents/CEvents';
// import EventApplications from './EventApplications/EventApplications';
// import CEventApplications from './company-side/CEventApplications/CEventApplications';
// import Messages from './Messages/Messages'
//Main Component
class Main extends Component {
  render() {

    
    return (
        <div>
        {/*Render Different Component based on Route*/}
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/home" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CJobSearch />
          else
            return <JobSearch />    
        }}/>
        {/* <Route path="/home" component={JobSearch} /> */}
        <Route path="/nav" component={Home}/>
        {/* <Route path="/jobs" component={JobSearch}/> */}
        <Route path="/jobs" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CJobSearch />
          else
            return <JobSearch />    
        }}/>
        <Route path="/profile" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CProfile />
          else
            return <Profile />    
        }}/>
        {/* <Route exact path="/register" component={Register}/> */}
        <Route exact path="/logout" component={Logout}/>
        <Route path="/jobSearch" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CJobSearch />
          else
            return <JobSearch />    
        }}/>
        <Route path = "/displayCompany/:id" component={CompanyProfile} />
        <Route path = "/displayStudent/:id" component={StudentProfile} />
        
        {/* <Route path = "/studentApplications" component={StudentApplication} /> */}
        <Route path="/studentApplications" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CStudentApplications />
          else
            return <StudentApplication />    
        }}/>
        <Route path="/studentApplications" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CStudentApplications />
          else
            return <StudentApplication />    
        }}/>
        <Route path = "/students" component = {StudentDetails} />
        {/* <Route path="/events" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CEvents />
          else
            return <Events />    
        }}/> */}
        {/* <Route path="/EventApplication" render={ () => {
          if(localStorage.getItem('type') === 'company')
            return <CEventApplications />
          else
            return <EventApplications />    
        }}/> */}
        {/* <Route path = "/messages/:id/:name" component={Messages} />
        <Route path="/messages" render={ () => {
            return <Messages />    
        }}/> */}
        
        {/* <DisplayCompany/>
        </Route> */}
        {/* <Route path="/home" component={Home}/>
        <Route path="/delete" component={Delete}/>
        <Route path="/create" component={Create}/> */}
        </Switch>
    </div>
    );
  }
}
export default Main;
