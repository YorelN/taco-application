import axios from "axios";
import { ADD_USER_STORY, LIST_USER_STORIES } from "./actionTypes";


const apiClient = axios.create({
    baseURL: 'http://localhost:80',
});


export function listUserStories() {
  return async function(dispatch) {
    const URL = `/boards/1/tasks`;
    const { data: tasks, status } = await apiClient(URL, {
    });
    dispatch({
      type: LIST_USER_STORIES,
      payload: tasks
    });

    return status;
  };
}

export function addUserStories() {
  return async function(dispatch) {
    const URL = `/api/boards/${1}/tasks`;
    const METHOD = "POST";

    const { data: tasks, status } = await axios({
      URL,
      METHOD
    });
    dispatch({
      type: ADD_USER_STORY,
      payload: tasks
    });

    return status;
  };
}
