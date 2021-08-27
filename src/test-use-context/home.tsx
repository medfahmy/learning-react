import React, { useContext } from "react";
import { MyContext, User } from "./user-context";

export const Home: React.FC = function () {
  const { user, setUser } = useContext(MyContext);

  return (
    <div>
      <h2>home</h2>

      {user ? (
        <button
          onClick={async () => {
            setUser(null);
          }}
        >
          logout
        </button>
      ) : (
        <button
          onClick={async () => {
            const user = await login();
            setUser(user);
          }}
        >
          login
        </button>
      )}

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

const login = async function (): Promise<User> {
  return {
    id: 4,
    username: "bob",
    email: "bob@bob.com",
  };
};
