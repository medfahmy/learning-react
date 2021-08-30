import { FC, Suspense } from "react";

const url = "randomuser.me/api?results=1";

const fetchPerson = function (url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.results[0]);
};

const wrapPromise = function (promise: Promise<any>) {
  let status = "pending";
  let result: any = "";
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if ((status = "error")) {
        throw result;
      }

      return result;
    },
  };
};

const createResource = () => {
  return {
    person: wrapPromise(fetchPerson(url)),
  };
};

export const SuspenseDemo: FC = function () {
  const resource = createResource();
  const person = resource.person.read();

  return (
    <Suspense fallback={<h1>loading ...</h1>}>
      <div>
        <h3>{person.name.first}</h3>
      </div>
    </Suspense>
  );
};
