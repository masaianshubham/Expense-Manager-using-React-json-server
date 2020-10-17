import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import expense from "./Expense/expenseReducer";
import authreducer from "./Auth/authReducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({ app:expense, auth:authreducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);