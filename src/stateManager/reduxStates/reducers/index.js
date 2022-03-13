import macroReducer from "./macroTracker";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const appReducers = combineReducers({
    macroTracker    : macroReducer,
    userReducer     : userReducer,     
});

export default appReducers;