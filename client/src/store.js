import { createStore, applyMiddleware } from "redux";
import { RippedBodyReducer } from "./Reducers";
import thunk from "redux-thunk";

export const store = createStore(RippedBodyReducer, applyMiddleware(thunk));
