export const productInitialState = {
    products: [],
    companyEmail: ''
}

export const productReducer = (state = productInitialState, action) => {
    switch (action.type) {

        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: action.payload
            }

        case 'COMPANY_DETAILS':
            return {
                ...state,
                companyEmail: action.payload,
            }

        default:
            return state;
    }
}

