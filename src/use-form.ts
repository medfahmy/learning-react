import { ChangeEventHandler, useState } from "react";

export const useForm = function <T>(
  initialValues: T
): [T, ChangeEventHandler<HTMLInputElement>] {
  const [values, setValues] = useState<T>(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
