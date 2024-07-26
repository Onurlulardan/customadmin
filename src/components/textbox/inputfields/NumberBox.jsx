import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const NumberBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  max,
  min,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  precision = 2,
  step = 0.1,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (valueString) => {
    setValue(valueString);
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
    const numValue = parseFloat(value);
    if (isRequired && !value) {
      setError(`${label} zorunludur`);
    } else if (max !== undefined && numValue > max) {
      setError(`Maksimum değer ${max} olmalıdır`);
    } else if (min !== undefined && numValue < min) {
      setError(`Minimum değer ${min} olmalıdır`);
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
      {label && <FormLabel>{label}</FormLabel>}
      <NumberInput
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        max={max}
        min={min}
        precision={precision}
        step={step}
        {...props}
      >
        <NumberInputField
          placeholder={placeholder}
          borderColor={error && isTouched && !isFocused ? "red.500" : undefined}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

NumberBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  precision: PropTypes.number,
  step: PropTypes.number,
};

export default NumberBox;
