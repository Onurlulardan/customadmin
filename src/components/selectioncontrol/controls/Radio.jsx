import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  RadioGroup as ChakraRadioGroup,
  Radio as ChakraRadio,
  FormErrorMessage,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

const RadioGroup = ({
  name,
  label,
  options,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  defaultValue,
  spacing = 4,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (value) => {
    setValue(value);
  };

  const handleBlur = () => {
    setIsTouched(true);
    setIsFocused(false);
    validateInput();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(value);
    }
  }, [value]);

  const validateInput = () => {
    if (isRequired && !value) {
      setError(`${label} zorunludur`);
    } else if (customValidation && !customValidation(value)) {
      setError(customErrorMessage || `Geçersiz değer`);
    } else {
      setError("");
    }
  };

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error && isTouched}
      my={4}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box
        spacing={spacing}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      >
        <ChakraRadioGroup
          id={name}
          value={value}
          onChange={handleChange}
          isDisabled={disabled}
          display={"flex"}
          gap={spacing}
          {...props}
        >
          {options.map((option, index) => (
            <ChakraRadio key={index} value={option.value} isReadOnly={readOnly}>
              {option.label}
            </ChakraRadio>
          ))}
        </ChakraRadioGroup>
      </Box>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialValue: PropTypes.string,
  defaultValue: PropTypes.string,
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

export default RadioGroup;
