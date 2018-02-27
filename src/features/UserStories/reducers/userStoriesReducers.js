import { LIST_USER_STORIES, ADD_USER_STORY } from "../actions/actionTypes";

import userStoriesInitialState from "./initialState";

export default function(state = userStoriesInitialState, action = {}) {
  switch (action.type) {
    case LIST_USER_STORIES:
      const tasks = action.payload;
      return Object.assign({}, state, {
        projects: tasks
      });

    case ADD_USER_STORY:
      const newTask = action.payload;
      return Object.assign({}, state, {
        projects: newTask
      });
    default:
      return state;
  }
}
