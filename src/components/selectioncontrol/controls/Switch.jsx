import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Switch as ChakraSwitch,
  FormErrorMessage,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

const SwitchGroup = ({
  name,
  label,
  initialValue = false,
  getFinalValue,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.checked);
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
    if (customValidation && !customValidation(value)) {
      setError(customErrorMessage || `Geçersiz değer`);
    } else {
      setError("");
    }
  };

  return (
    <FormControl isInvalid={!!error && isTouched} my={4}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box onBlur={handleBlur} onFocus={handleFocus} {...props}>
        <ChakraSwitch
          id={name}
          isChecked={value}
          onChange={handleChange}
          isDisabled={disabled}
          isReadOnly={readOnly}
          autoFocus={autoFocus}
          {...props}
        />
      </Box>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched && !isFocused && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

SwitchGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  initialValue: PropTypes.bool,
  defaultValue: PropTypes.bool,
  getFinalValue: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

export default SwitchGroup;
