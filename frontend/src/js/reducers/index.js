import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import SprofileReducer from './studentProfile';
import CprofileReducer from './companyProfile';
import jobReducer from './job';
import CjobReducer from './Cjob';
import CeventReducer from './Cevents';
import eventReducer from './event';
import msgReducers from './messages';
// import studentProfileReducer from './studentProfileReducer';

const rootReducer = combineReducers({
    Login: loginReducer,
    SProfile : SprofileReducer,
    CProfile : CprofileReducer,
    jobs : jobReducer,
    Cjobs : CjobReducer,
    Cevents : CeventReducer,
    events : eventReducer,
    msg : msgReducers
})

export default rootReducer;