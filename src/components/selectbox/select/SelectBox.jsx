import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const SelectBox = ({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  ...props
}) => {
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
    if (customValidation && !customValidation(selectedValue)) {
      setError(customErrorMessage || "Geçersiz değer");
    } else {
      setError("");
    }
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} my={4}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Select
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
};

export default SelectBox;
