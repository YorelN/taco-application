import { combineReducers } from 'redux';
import camp from "./features/campaigns/campReducers";


const rootReducer = combineReducers({
  camp, // shorthand for lists: lists
});

export default rootReducer;
