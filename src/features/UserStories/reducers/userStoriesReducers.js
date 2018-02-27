import {
  LIST_USER_STORIES,
  ADD_USER_STORY,
  DETAILS_USER_STORY
} from "../actions/actionTypes";

import userStoriesInitialState from "./initialState";

export default function(state = userStoriesInitialState, action = {}) {
  switch (action.type) {
    case LIST_USER_STORIES:
      const tasks = action.payload;
      return Object.assign({}, state, {
        userStories: tasks
      });

    case ADD_USER_STORY:
      const newTask = action.payload;
      return Object.assign({}, state, {
        userStory: newTask
      });

    case DETAILS_USER_STORY:
      const detailedTask = action.payload;
      return Object.assign({}, state, {
        userStory: detailedTask
      });
    default:
      return state;
  }
}
