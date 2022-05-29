import macroReducer from "./macroTracker";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

const appReducers = combineReducers({
    macroTracker    : macroReducer,
    userReducer     : userReducer,   
    errorReducer    : errorReducer  
});

export default appReducers;