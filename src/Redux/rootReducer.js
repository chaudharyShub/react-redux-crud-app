import { combineReducers } from "redux";
import { companyReducer } from './companyReducer';
import { productReducer } from './ProductReducer';
import { adminLoginReducer } from './adminLoginReducer';
import { userLoginReducer } from './userLoginReducer';

const rootReducer = combineReducers({
    companyReducer,
    productReducer,
    adminLoginReducer,
    userLoginReducer
});

export default rootReducer;
