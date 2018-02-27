import axios from "axios";
import {ADD_SUBTASKS, LIST_SUBTASKS} from "./actionTypes";

export function listSubTasks(userStoryId) {
  return async function(dispatch) {
    const URL = `/api/boards/1/tasks/${userStoryId}/subtasks`;
    const { data: tasks, status } = await axios.get(URL, {});
    dispatch({
      type: LIST_SUBTASKS,
      payload: tasks
    });

    return status;
  };
}

export function addSubTask(userStoryId, newSubTasks) {
  return async function(dispatch) {
    const URL = `/api/boards/${1}/tasks/${userStoryId}/subtasks`;

    const { data: tasks, status } = await axios.post(URL, newSubTasks);
    dispatch({
      type: ADD_SUBTASKS,
      payload: tasks
    });

    return status;
  };
}
