import { createStore } from "./redux.mjs";
import { reducer } from "./reducer.mjs";

const store = createStore(reducer, 1)

const listener = () => console.log('hello')
const listener2 = () => console.log('bye')
const listener3 = () => console.log('holy')

const unsubscribe = store.subscribe(listener)
store.subscribe(listener2)
// 1 + 2
store.dispatch({ type: 'increment', count: 2 }) 

unsubscribe()
store.subscribe(listener3)


// 3 + 2
store.dispatch({ type: 'increment', count: 2 }) 