export const isLoginInitialState = {
    isAdminLogin: false
}

export const adminLoginReducer = (state = isLoginInitialState, action) => {
    switch (action.type) {
        case 'LOGIN_TRUE':
            localStorage.setItem('isAdminLogin', true);
            return {
                ...state,
                isAdminLogin: true
            }
        case 'LOGIN_FALSE':
            localStorage.setItem('isAdminLogin', false);
            return isLoginInitialState;

        default:
            return state;
    }
}