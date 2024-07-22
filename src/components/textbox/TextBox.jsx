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
  error = "",
  type = "text",
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
  }, [value, getFinalValue]);

  return (
    <FormControl isRequired={isRequired} isInvalid={error} my={4}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextBox;
