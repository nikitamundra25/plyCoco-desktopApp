import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { languageReducer } from "./Language";
/**
 *
 */
const AppReducer = combineReducers({
    languageReducer,
    routing: routerReducer
});

export default AppReducer;
