export const isLoginInitialState = {
    isLogin: false
}

export const loginReducer = (state = isLoginInitialState, action) => {
    switch (action.type) {
        case 'LOGIN_TRUE':
            localStorage.setItem('isAdminLogin', true);
            return {
                ...state,
                isLogin: true
            }
        case 'LOGIN_FALSE':
            localStorage.setItem('isAdminLogin', false);
            return state

        default:
            return state;
    }
}