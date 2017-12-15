import { combineReducers } from 'redux';
import home from './features/Home/homeReducers';

const rootReducer = combineReducers({
    home : home
});

export default rootReducer;