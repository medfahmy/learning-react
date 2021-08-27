import React, { useRef, useState } from "react";
import { Hello } from "./Hello";
// import { useFetch } from "./use-fetch";
import { useForm } from "./use-form";

// const URL = "https://randomuser.me/api/?results";
// const URL = "http://numbersapi.com/9/trivia";

interface Input {
  email: string;
  password: string;
}

export const TestUseEffect: React.FC = function () {
  const [values, handleChange] = useForm<Input>({ email: "", password: "" });

  const [isHello, toggleHello] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleNumberChange: ChangeEventHandler<HTMLInputElement> = function (
  //   e
  // ) {
  //   if (!e.target.value) {
  //     return;
  //   }
  //   setNumber(parseInt(e.target.value));
  // };

  return (
    <div>
      <>
        <button onClick={() => toggleHello(!isHello)}>
          {isHello ? "hide hello" : "show hello"}
        </button>
        {isHello && <Hello />}

        <br />
        <br />

        <input
          ref={inputRef}
          name="email"
          value={values.email}
          onChange={handleChange}
        ></input>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        ></input>

        <button
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          focus
        </button>
      </>
    </div>
  );
};
