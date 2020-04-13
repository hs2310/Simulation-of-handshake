import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import SprofileReducer from './studentProfile';
import CprofileReducer from './companyProfile';
import jobReducer from './job';
import CjobReducer from './Cjob';
// import studentProfileReducer from './studentProfileReducer';

const rootReducer = combineReducers({
    Login: loginReducer,
    SProfile : SprofileReducer,
    CProfile : CprofileReducer,
    jobs : jobReducer,
    Cjobs : CjobReducer
})

export default rootReducer;