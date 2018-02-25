import {combineReducers} from "redux";

import dashboard from './features/dashboard/reducers/dashboardReducers'

const rootReducer = combineReducers({
    dashboard,
});


export default rootReducer;