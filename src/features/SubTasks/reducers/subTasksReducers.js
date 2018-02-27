import {
  ADD_SUBTASKS,
    LIST_SUBTASKS
} from "../actions/actionTypes";

import userStoriesInitialState from "./initialState";

export default function(state = userStoriesInitialState, action = {}) {
  switch (action.type) {
    case LIST_SUBTASKS:
      const subTasks = action.payload;
      return Object.assign({}, state, {
          subTasks: subTasks
      });

    case ADD_SUBTASKS:
      const newSubTask = action.payload;
      return Object.assign({}, state, {
        subTask: newSubTask
      });

    default:
      return state;
  }
}
