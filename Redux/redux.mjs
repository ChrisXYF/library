import { isPlainObject } from "is-plain-object";
import kindOf from "kind-of";

const randomString = () =>
  Math.random().toString(36).substring(7).split("").join(".");

const actionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
};

function createStore(reducer, preState, enhancer) {
  let currentState = preState;
  let currentReducer = reducer;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  function getState() {
    if (isDispatching) {
      throw new Error("Dispatching now,wait a moment");
    }

    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        `It's not a pure Object，it's something like ${kindOf(action)}`
      );
    }
    if (isDispatching) {
      throw new Error("Dispatching now,wait a moment");
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach((listener) => listener());

    return action;
  }

  function avoidMutateNextListeners() {
    if (nextListeners !== currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function subscribe(listener) {
    if (isDispatching) {
      throw new Error("Dispatching now,wait a moment");
    }

    let isSubScribed = true;
    avoidMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubScribed) {
        return;
      }

      if (isDispatching) {
        throw new Error("Dispatching now,wait a moment");
      }
      isSubScribed = false;
      avoidMutateNextListeners();

      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = [];
    };
  }

  dispatch({ type: actionTypes.INIT });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export { createStore };
