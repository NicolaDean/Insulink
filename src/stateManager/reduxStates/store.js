import { createStore,applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'

import appReducers from "./reducers";


const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(appReducers,middleware);