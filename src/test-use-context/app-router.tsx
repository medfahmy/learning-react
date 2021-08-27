import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { About } from "./about";
import { Home } from "./home";
import { MyContext, User } from "./user-context";

export function AppRouter() {
  const [user, setUser] = useState<User>(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </ul>
        </nav>

        <MyContext.Provider value={value}>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </MyContext.Provider>
      </div>
    </Router>
  );
}
