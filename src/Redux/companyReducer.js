export const companyInitialState = {
    companies: [],
}

export const companyReducer = (state = companyInitialState, action) => {
    switch (action.type) {

        case 'ADD_COMPANY':
            const arr = [...state.companies, action.payload];
            localStorage.setItem('companies', JSON.stringify(arr));
            return {
                ...state,
                companies: arr
            }

        case 'UPDATE_COMPANY':
            const arr1 = action.payload;
            localStorage.setItem('companies', JSON.stringify(arr1));
            return {
                ...state,
                companies: arr1,
            }

        default:
            return state;
    }
}