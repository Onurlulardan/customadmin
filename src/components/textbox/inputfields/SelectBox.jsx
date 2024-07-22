import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  FormHelperText,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";

const SelectBox = ({
  name,
  label,
  placeholder,
  initialValue = "",
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  leftAddon,
  rightAddon,
  options = [],
  icon,
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
        {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
        <Select
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          icon={icon}
          borderColor={error && isTouched && !isFocused ? "red.500" : undefined}
          {...props}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
      </InputGroup>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  getFinalValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  leftAddon: PropTypes.node,
  rightAddon: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  icon: PropTypes.element,
};

export default SelectBox;
