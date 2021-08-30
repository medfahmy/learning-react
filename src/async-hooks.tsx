import { FC, FormEventHandler, useEffect, useState } from "react";

export const AsyncHooksDemo: FC = function () {
  const [number, setNumber] = useState<number>(0);
  const [query, setQuery] = useState<number>(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    setQuery(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://numbersapi.com/${number}/trivia`;
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
      } catch (err) {
        console.log(err);
      }

      if (query) {
        console.log({ query });
        fetchData();
      }
    };
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={number}
          onChange={(e) => {
            setNumber(parseInt(e.target.value));
          }}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
