import { combineReducers } from "redux";
import { companyReducer } from './companyReducer';
import { productReducer } from './ProductReducer';
import { loginReducer } from "./LoginReducer";

const rootReducer = combineReducers({
    companyReducer,
    productReducer,
    loginReducer
});

export default rootReducer;
