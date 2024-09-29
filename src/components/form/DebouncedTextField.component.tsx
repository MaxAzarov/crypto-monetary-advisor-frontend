import { useCallback, useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

export type DebouncedTextFieldProps = TextFieldProps & {
  debounceTimeout?: number;
};

export function DebouncedTextField({
  value,
  onChange,
  debounceTimeout = 200,
  ...props
}: DebouncedTextFieldProps) {
  const [innerValue, setInnerValue] = useState("");

  useEffect(() => {
    if (value) {
      setInnerValue(value as string);
    } else {
      setInnerValue("");
    }
  }, [value]);

  const debouncedHandleOnChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    debounceTimeout
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();

      const newValue = event.currentTarget.value;
      setInnerValue(newValue);
      debouncedHandleOnChange(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <TextField {...props} value={innerValue} onChange={handleOnChange} />;
}
