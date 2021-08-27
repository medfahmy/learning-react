import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
} | null;

interface MyContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultValue = {
  user: null,
  setUser: () => {},
};

export const MyContext = createContext<MyContext>(defaultValue);
