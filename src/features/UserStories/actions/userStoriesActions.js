import axios from 'axios';
import { LIST_PROJECTS } from "./actionTypes";

export function listProjects() {
    return function (dispatch) {
        dispatch({
            type: LIST_PROJECTS,
            payload: [
                {
                    name: 'TEST 1',
                    id: 'FREA8GNRENFR9'
                },
                {
                    name: 'TEST 2',
                    id: 'FREV8QVREA9F3'
                },
                {
                    name: 'TEST 3',
                    id: 'CSQ89FAEVCRE'
                }
            ]
        })
    }
}