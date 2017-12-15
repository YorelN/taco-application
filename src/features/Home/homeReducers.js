import homeInitialState from "./homeInitialState";

export default (state = homeInitialState, action = {}) =>
{
    switch (action.type) {
        case `WELCOME_MSG` :
            return Object.assign({}, state, {
                welcomeMessage: action.payload,
            });
        default :
            return state
    }
}