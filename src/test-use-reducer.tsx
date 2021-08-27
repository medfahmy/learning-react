import React, { Reducer, useReducer } from "react";

interface State {}

enum ActionType {
  increment = "INCREMENT",
  decrement = "DECREMENT",
}

interface Action {
  type: ActionType;
}

const incrementAction: Action = {
  type: ActionType.increment,
};

const decrementAction: Action = {
  type: ActionType.decrement,
};

const reducer: Reducer<number, Action> = function (state, action) {
  // return state + action.payload;
  switch (action.type) {
    case ActionType.increment:
      return state + 1;
    case ActionType.decrement:
      return state - 1;
    default:
      return state;
  }
};

export const TestUseReducer: React.FC = function () {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <div>count : {count}</div>
      <button onClick={() => dispatch(incrementAction)}>increment</button>
      <button onClick={() => dispatch(decrementAction)}>decrement</button>
    </div>
  );
};
