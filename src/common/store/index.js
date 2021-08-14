import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { analyticsReducer } from "modules/analytics/reducer";

const reducer = combineReducers({
  analytics: analyticsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
