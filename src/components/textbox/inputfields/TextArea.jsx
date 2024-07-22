import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const CustomTextArea = ({
  name,
  label,
  placeholder,
  initialValue,
  getFinalValue,
  isRequired,
  disabled,
  readOnly,
  maxLength,
  minLength,
  helpText,
  autoFocus,
  customValidation,
  customErrorMessage,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
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
  }, [value, getFinalValue]);

  const validateInput = () => {
    if (isRequired && !value) {
      setError(`${label} zorunludur`);
    } else if (maxLength && value.length > maxLength) {
      setError(`Maksimum uzunluk ${maxLength} karakter olmalıdır`);
    } else if (minLength && value.length < minLength) {
      setError(`Minimum uzunluk ${minLength} karakter olmalıdır`);
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
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        borderColor={error && isTouched && !isFocused ? "red.500" : undefined}
        {...props}
      />
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

CustomTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

CustomTextArea.defaultProps = {
  initialValue: "",
  isRequired: false,
  disabled: false,
  readOnly: false,
  autoFocus: false,
};

export default CustomTextArea;