import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Checkbox as ChakraCheckbox,
  FormErrorMessage,
  FormHelperText,
  Box,
  Stack,
} from "@chakra-ui/react";

const CheckboxGroup = ({
  name,
  label,
  options,
  initialValue = [],
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  defaultValue = [],
  spacing = 4,
  ...props
}) => {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultValue.length) setValues(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
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
      getFinalValue(values);
    }
  }, [values]);

  const validateInput = () => {
    if (isRequired && values.length === 0) {
      setError(`${label} zorunludur`);
    } else if (customValidation && !customValidation(values)) {
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
      <Box onBlur={handleBlur} onFocus={handleFocus} {...props}>
        <Stack spacing={spacing}>
          {options.map((option, index) => (
            <ChakraCheckbox
              key={index}
              value={option.value}
              isChecked={values.includes(option.value)}
              onChange={handleChange}
              isDisabled={disabled}
              isReadOnly={readOnly}
              autoFocus={autoFocus}
              isRequired={false}
            >
              {option.label}
            </ChakraCheckbox>
          ))}
        </Stack>
      </Box>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialValue: PropTypes.array,
  defaultValue: PropTypes.array,
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  spacing: PropTypes.number,
};

export default CheckboxGroup;
