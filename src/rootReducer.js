import { combineReducers } from "redux";

import dashboard from "./features/dashboard/reducers/dashboardReducers";
import userStory from "./features/UserStories/reducers/userStoriesReducers";
import subTask from "./features/SubTasks/reducers/subTasksReducers";

const rootReducer = combineReducers({
  dashboard,
  userStory,
  subTask,
});

export default rootReducer;
