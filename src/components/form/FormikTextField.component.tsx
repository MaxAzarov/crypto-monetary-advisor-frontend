import { useEffect, useRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikValues, useFormik, useFormikContext } from "formik";
import get from "lodash/get";

import { DebouncedTextField } from "./DebouncedTextField.component";

interface IFormikTextField<T extends FormikValues>
  extends Omit<TextFieldProps, "name"> {
  name: string;
  formik:
    | ReturnType<typeof useFormik<T>>
    | ReturnType<typeof useFormikContext<T>>;
  useDebounce?: boolean;
}

export function FormikTextField<T extends FormikValues = FormikValues>({
  name,
  formik,
  type,
  useDebounce = false,
  ...props
}: IFormikTextField<T>) {
  const Component = useDebounce ? DebouncedTextField : TextField;

  const value = get(formik.values, name);
  const touched = get(formik.touched, name);
  const error = get(formik.errors, name);

  const textFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // https://github.com/mui/material-ui/issues/7960
    const handleEvent = (e: WheelEvent) => e.preventDefault();
    const field = textFieldRef.current;

    field?.addEventListener("wheel", handleEvent);

    return () => {
      field?.removeEventListener("wheel", handleEvent);
    };
  }, []);

  return (
    <Component
      name={name}
      value={value}
      error={touched && !!error}
      helperText={touched && (error as string)}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      type={type}
      disabled={formik.isSubmitting}
      inputProps={{ type }}
      ref={textFieldRef}
      {...props}
    />
  );
}
