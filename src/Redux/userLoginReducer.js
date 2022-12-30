export const userInitialState = {
    isUserLogin: false
}

export const userLoginReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_TRUE':
            localStorage.setItem('isUserLogin', true);
            return {
                ...state,
                isUserLogin: true
            }
        case 'USER_LOGIN_FALSE':
            localStorage.setItem('isUserLogin', false);
            return userInitialState;

        default:
            return state;
    }
}