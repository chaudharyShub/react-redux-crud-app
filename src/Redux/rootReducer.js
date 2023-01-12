import { combineReducers } from "redux";
import { companyReducer } from './companyReducer';
import { productReducer } from './ProductReducer';

const rootReducer = combineReducers({
    productReducer,
    companyReducer
});

export default rootReducer;
