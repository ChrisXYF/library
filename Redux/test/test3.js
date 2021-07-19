import { createStore } from "../redux.mjs";
import { reducer } from "../reducer.mjs";
import Middlewares from "../middlewares.mjs";

const timeMiddleware = (store) => (next) => (action) => {
  console.log("time", new Date().getTime());
  next(action);
};

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("this state", store.getState());
  console.log("action", action);
  next(action);
  console.log("next state", store.getState());
};

const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error("error: ", err);
  }
};

const rewriteCreateStoreFunc = Middlewares(
  exceptionMiddleware,
  timeMiddleware,
  loggerMiddleware
);
const store = createStore(reducer, 1, rewriteCreateStoreFunc);

store.dispatch({ type: "increment", count: 2 });
store.getState();
