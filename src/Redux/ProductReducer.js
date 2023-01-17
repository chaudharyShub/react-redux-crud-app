export const productInitialState = {
    products: [],
    userName: ''
}

export const productReducer = (state = productInitialState, action) => {
    switch (action.type) {

        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: action.payload
            }

        case 'USER_DETAILS':
            return {
                ...state,
                userName: action.payload,
            }

        default:
            return state;
    }
}

