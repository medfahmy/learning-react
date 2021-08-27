import React, { useContext } from "react";
import { MyContext } from "./user-context";

export const About: React.FC = function () {
  const { user } = useContext(MyContext);

  return (
    <div>
      <h2>about</h2>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
