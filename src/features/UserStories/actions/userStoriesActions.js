import axios from "axios";
import {ADD_USER_STORY, DETAILS_USER_STORY, LIST_USER_STORIES} from "./actionTypes";

const apiClient = axios.create({
  baseURL: "http://localhost:80"
});

export function listUserStories() {
  return async function(dispatch) {
    const URL = `/api/boards/1/tasks`;
    const { data: tasks, status } = await axios.get(URL, {});
    dispatch({
      type: LIST_USER_STORIES,
      payload: tasks
    });

    return status;
  };
}

export function addUserStory(newUserStory) {
  return async function(dispatch) {
    const URL = `/api/boards/${1}/tasks`;

    const { data: tasks, status } = await axios.post(URL, newUserStory);
    dispatch({
      type: ADD_USER_STORY,
      payload: tasks
    });

    return status;
  };
}

export function detailsUserStory(taskId) {
    return async function(dispatch) {
        const URL = `/api/boards/${1}/tasks/${taskId}`;

        const { data: detailedTask, status } = await axios.get(URL);
        dispatch({
            type: DETAILS_USER_STORY,
            payload: detailedTask
        });

        return status;
    };
}


export function deleteUserStory(taskId) {
    return async function(dispatch) {
        const URL = `/api/boards/${1}/tasks/${taskId}`;

        const { data: detailedTask, status } = await axios.delete(URL);
        dispatch({
            type: DETAILS_USER_STORY,
            payload: detailedTask
        });

        return status;
    };
}
