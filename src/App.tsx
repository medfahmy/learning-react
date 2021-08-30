import React from "react";
import { AsyncHooksDemo } from "./async-hooks";
import { FormikDemo } from "./formik-demo";
import { Login } from "./login";
import { SuspenseDemo } from "./suspense-demo";
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
      {/* <TodoList /> */}
      {/* <Login /> */}
      {/* <AsyncHooksDemo /> */}
      {/* <SuspenseDemo /> */}
      <FormikDemo />
    </div>
  );
};
