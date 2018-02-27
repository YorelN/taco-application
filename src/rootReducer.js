import { combineReducers } from "redux";

import dashboard from "./features/dashboard/reducers/dashboardReducers";
import userStory from "./features/UserStories/reducers/userStoriesReducers";

const rootReducer = combineReducers({
  dashboard,
  userStory
});

export default rootReducer;
