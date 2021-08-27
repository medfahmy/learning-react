import { useEffect, useRef, useState } from "react";

interface State {
  data: string | null;
  loading: boolean;
}

export const useFetch = function (url: string) {
  // const isCurrent = useRef(true);
  const [state, setState] = useState<State>({ data: null, loading: false });

  // useEffect(() => {
  //   return function () {
  //     // called when the component is going to unmount
  //     isCurrent.current = false;
  //   };
  // }, []);

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));

    const fetchData = async function () {
      const result = await fetch(url);
      const text = await result.text();

      // if (isCurrent.current) {
      setState({ data: text, loading: false });
      // }
    };

    setTimeout(() => fetchData(), 2000);

    return function () {
      setState({ data: null, loading: false });
    };
  }, [url, setState]);

  return state;
};
