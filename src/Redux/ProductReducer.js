export const productInitialState = {
    products: [],
    companyEmail: ''
}

export const productReducer = (state = productInitialState, action) => {
    switch (action.type) {

        case 'ADD_PRODUCT':
            const arr1 = [...state.products, action.payload];
            localStorage.setItem('products', JSON.stringify(arr1));
            return {
                ...state,
                products: arr1
            }

        case 'UPDATE_PRODUCT':
            const arr2 = action.payload;
            localStorage.setItem('products', JSON.stringify(arr2));
            return {
                ...state,
                products: arr2,
            }

        case 'COMPANY_DETAILS':
            localStorage.setItem('companyEmail', JSON.stringify(action.payload));
            return {
                ...state,
                companyEmail: action.payload,
            }

        default:
            return state;
    }
}