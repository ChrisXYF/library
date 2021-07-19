import { createStore } from "../redux.mjs";
import { reducer } from "../reducer.mjs";

const store = createStore(reducer, 1);
store.dispatch({ type: "increment", count: 2 });
store.dispatch({ type: "decrement", count: 1 });

console.log(store.getState());
