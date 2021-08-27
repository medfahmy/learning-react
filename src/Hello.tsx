import React, { useEffect, useState } from "react";
import { useFetch } from "./use-fetch";

export const Hello: React.FC = function () {
  // const renders = useRef(0);

  // console.log("renders :", renders.current++);

  const [count, setCount] = useState<number>(() => {
    const countFromLocalStorage = localStorage.getItem("count");
    if (countFromLocalStorage) {
      return JSON.parse(countFromLocalStorage);
    } else {
      return 0;
    }
  });

  let url = `http://numbersapi.com/${count}/trivia`;
  const { data, loading } = useFetch(url);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  // useEffect(() => {
  //   console.log("mounted");

  //   return () => {
  //     console.log("unmounted");
  //   };
  // }, []);

  return (
    <div>
      <h2>get a random fact about a number</h2>
      <h3>current number : {count}</h3>
      {/* <input value={number} onChange={handleNumberChange}></input> */}
      <button onClick={() => setCount(count + 1)}>increment</button>
      <h3>{loading ? "loading..." : data}</h3>
    </div>
  );
};
