import {
  LIST_USER_STORIES,
  ADD_USER_STORY,
  DETAILS_USER_STORY
} from "../actions/actionTypes";

import userStoriesInitialState from "./initialState";

export default function(state = userStoriesInitialState, action = {}) {
  switch (action.type) {
    case LIST_USER_STORIES:
      const response = action.payload;
      const boards = action.payload["boards"];

      if (response && boards && boards["1"]) {
        return Object.assign({}, state, {
          userStories: boards["1"].tasks
        });
      }
    case ADD_USER_STORY:
      const newTask = action.payload;
      return Object.assign({}, state, {
        userStory: newTask,
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
