import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const TextBox = ({
  name,
  label,
  placeholder,
  initialValue,
  getFinalValue,
  isRequired,
  type,
  disabled,
  readOnly,
  maxLength,
  minLength,
  helpText,
  autoFocus,
  customValidation,
  customErrorMessage,
  showCharacterCount,
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
    } else if (
      type === "email" &&
      !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value)
    ) {
      setError(`Geçersiz e-posta formatı`);
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
      <InputGroup>
        <Input
          type={type}
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
        {showCharacterCount && maxLength && (
          <InputRightElement width="4.5rem">
            <FormHelperText>
              {value.length}/{maxLength}
            </FormHelperText>
          </InputRightElement>
        )}
      </InputGroup>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  showCharacterCount: PropTypes.bool,
};

TextBox.defaultProps = {
  initialValue: "",
  isRequired: false,
  type: "text",
  disabled: false,
  readOnly: false,
  autoFocus: false,
  showCharacterCount: false,
};

export default TextBox;