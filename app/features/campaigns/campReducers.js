export default (state = {}, action = {}) => {
    switch (action.type) {
        case 'TEST' :
            return console.log('success');
        default :
            return state;
    }
}