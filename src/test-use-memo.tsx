import React, { useMemo, useState } from "react";
import { useFetch } from "./use-fetch";

export const TestUseMemo: React.FC = function () {
  const [count, setCount] = useState(0);
  const { data } = useFetch(URL);

  // const longestWord = computeLongestWord(data);

  // re-compute "longestWord" only when the dependencies change

  const longestWord = useMemo(
    () => computeLongestWord(data),
    [computeLongestWord, data]
  );

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>

      <div>{longestWord}</div>
    </div>
  );
};

const URL =
  "https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json";

function computeLongestWord(data: string | null) {
  if (!data) {
    return "";
  }

  console.log("computing longest word");

  const sentences: string[] = JSON.parse(data);

  const longestWord = sentences
    .map((sentence) => sentence.split(" "))
    .reduce((prev, curr) => [...prev, ...curr])
    .reduce((prev, curr) => (curr.length > prev.length ? curr : prev));

  //   JSON.parse(data).forEach((sentence: string) =>
  //     sentence.split(" ").forEach((word: string) => {
  //       if (word.length > longestWord.length) {
  //         console.log(word);
  //         longestWord = word;
  //       }
  //     })
  //   );

  return longestWord;
}
