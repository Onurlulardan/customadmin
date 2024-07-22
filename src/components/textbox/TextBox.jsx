import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const TextBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  type = "text",
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
    if (isRequired && isTouched && !value) {
      setError(`${label} is required`);
    } else {
      setError("");
    }
  }, [value, getFinalValue, isRequired, label, isTouched]);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} my={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {isTouched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextBox;
