import {createStore, applyMiddleware, compose} from 'redux';
import reducer from "../reducers";
import thunk from "redux-thunk";
import promise from "redux-promise";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createNewStore() {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk, promise)));
}

const store = createNewStore();

export default store;