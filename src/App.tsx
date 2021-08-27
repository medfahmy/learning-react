import React from "react";
import { TodoList } from "./todo-list";
// import { TestUseEffect } from "./test-use-effect";
// import { TestUseReducer } from "./test-use-reducer";
// import { TestUseMemo } from "./test-use-memo";

export const App: React.FC = function () {
  return (
    <div>
      {/* <TestUseMemo /> */}
      {/* <TestUseEffect /> */}
      {/* <TestUseReducer /> */}
      <TodoList />
    </div>
  );
};
