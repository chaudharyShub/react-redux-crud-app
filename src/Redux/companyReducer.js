export const companyInitialState = {
    companies: [],
}

export const companyReducer = (state = companyInitialState, action) => {
    switch (action.type) {

        case 'UPDATE_COMPANY':
            console.log('company updated');
            return {
                ...state,
                companies: action.payload,
            }

        default:
            return state;
    }
}
