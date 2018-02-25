import { LIST_PROJECTS } from '../actions/actionTypes';

import dashboardInitialState from './initialState';

export default function(state = dashboardInitialState, action = {}) {
    switch (action.type) {
        case LIST_PROJECTS:
            const projects = action.payload;
            return Object.assign({}, state, {
                projects: projects,
            });

        default:
            return state;
    }
}