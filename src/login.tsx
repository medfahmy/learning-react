import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  Reducer,
  useReducer,
  useState,
} from "react";

interface User {
  username: string;
  password: string;
}

interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
};

interface LoginAction {
  type: "login";
  payload: User;
}

interface SuccessAction {
  type: "success";
}

interface LogoutAction {
  type: "logout";
}

interface ErrorAction {
  type: "error";
}

type Action = LoginAction | LogoutAction | SuccessAction | ErrorAction;

const loginReducer: Reducer<State, Action> = function (state, action) {
  switch (action.type) {
    case "login":
      return state;
    case "logout":
      return state;
    case "error":
      return state;
    default:
      return state;
  }
};

const login = async function ({
  username,
  password,
}: User): Promise<User | null> {
  setTimeout(() => {}, 2000);

  if (username === "bob" && password === "bob") {
    return { username: "bob", password: "bob" };
  } else {
    return null;
  }
};

export const Login: FC = function () {
  const [{ user, error, loading }, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  const [input, setInput] = useState({ username: "", password: "" });

  const handleLogin: FormEventHandler<HTMLFormElement> = async function (e) {
    e.preventDefault();

    // const current = await login(input);
    dispatch({ type: "login", payload: input });

    // if (current) {
    //   dispatch({ type: "login", payload: current });
    // } else {
    //   dispatch({ type: "failure" });
    // }
  };

  const handleLogout = function () {
    dispatch({ type: "logout" });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {" "}
          login
        </button>
      </form>
    </div>
  );
};
