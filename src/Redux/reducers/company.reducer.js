import { GET_COMPANY } from "../actions/Types"

const initialState = {
    allCompanies: []
}

const companyReducer = (state = initialState,action) => {
    
    // console.log('payload',action.payload,action.type,state);
    switch (action.type) {
        case GET_COMPANY:
            return {
                ...state,
                allCompanies: action.payload.docs
            }
        default:
            return initialState
    }


}
// export default companyReducer

