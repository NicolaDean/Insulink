import { createStore } from "@reduxjs/toolkit";
import appReducers from "./reducers";

export const store = createStore(appReducers);