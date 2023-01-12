import { applyMiddleware, legacy_createStore as createStore } from "redux"; 
// import thunkMiddleware from 'redux-thunk'
import rootReducer from "./rootReducer";

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = createStore(rootReducer);
