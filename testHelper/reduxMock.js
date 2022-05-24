import { createStore,applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import appReducers from "../src/stateManager/reduxStates/reducers";

const middleware = applyMiddleware(thunkMiddleware);

export const mockedStore = createStore(appReducers,middleware);