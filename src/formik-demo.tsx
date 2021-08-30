import { FC } from "react";
import {
  Field,
  FieldArray,
  FieldAttributes,
  Form,
  Formik,
  useField,
} from "formik";
import {
  Button,
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as yup from "yup";
import { randomId } from "./todo-list";

const initialValues = {
  firstname: "",
  lastname: "",
  isTall: false,
  cookies: [],
  yogurt: "",
  pets: [{ id: randomId(), type: "cat", name: "jarvis" }],
};

type MyRadioProps = {
  label: string;
} & FieldAttributes<{}>;

const MyRadio: FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: FC<FieldAttributes<{}>> = ({ placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      {...field}
    />
  );
};

const validationSchema = yup.object({
  firstname: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

export const FormikDemo: FC = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          setTimeout(() => {
            console.log(data);
            setSubmitting(false);
            resetForm();
          }, 1000);
        }}
        validationSchema={validationSchema}
        // validate={(values) => {
        //   const errors: Record<string, string> = {};

        //   if (values.firstname.includes("bob")) {
        //     errors.firstname = "no bob";
        //   }

        //   return errors;
        // }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField
                name="firstname"
                placeholder="first name"
                type="input"
              ></MyTextField>
            </div>
            <div>
              <MyTextField
                name="lastname"
                placeholder="last name"
                type="password"
              ></MyTextField>
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />

            <div>
              <h3>cookies :</h3>
              <Field
                name="cookies"
                type="checkbox"
                value="first"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="second"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="third"
                as={Checkbox}
              />
            </div>

            <div>
              <h3>yogurt :</h3>
              <MyRadio name="yogurt" type="radio" value="first" label="first" />

              <MyRadio
                name="yogurt"
                type="radio"
                value="second"
                label="second"
              />
              <MyRadio name="yogurt" type="radio" value="third" label="third" />
            </div>

            <FieldArray
              name="pets"
              render={(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        id: randomId(),
                        type: "frog",
                        name: "",
                      })
                    }
                    variant="outlined"
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder="pet name"
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          {/* {values.pets.map(({ type }) => {
                          return <MenuItem value="type">{type}</MenuItem>;
                        })} */}
                          <MenuItem value="cat">cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            />

            <div>
              <Button type="submit" disabled={isSubmitting} variant="outlined">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};
