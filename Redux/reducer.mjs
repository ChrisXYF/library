const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + action.count;
    case "decrement":
      return state - action.count;
    default:
      return state;
  }
};

export { reducer };
