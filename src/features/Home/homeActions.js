export const welcomeMessage = (msg) => {
    return async (dispatch) => {
        await dispatch({
            type : `WELCOME_MSG`,
            payload : msg
        })
    }
};