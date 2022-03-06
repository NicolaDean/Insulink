import macroReducer from "./macroTracker";
import { combineReducers } from "redux";

const appReducers = combineReducers({
    macroTracker : macroReducer,
});

export default appReducers;