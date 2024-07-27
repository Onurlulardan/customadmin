import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  List,
  ListItem,
  useColorModeValue,
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { FaChevronDown, FaTimes, FaChevronUp } from "react-icons/fa";

const AutoComplate = ({
  name,
  label,
  placeholder,
  initialValue,
  defaultValue,
  getFinalValue,
  isRequired = false,
  disabled = false,
  readOnly = false,
  helpText,
  autoFocus = false,
  customValidation,
  customErrorMessage = "",
  options = [],
  isMulti = false,
  isSearchable = true,
  ...props
}) => {
  const [value, setValue] = useState(
    isMulti ? initialValue || [] : initialValue || ""
  );
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSelect = (selectedValue) => {
    if (isMulti) {
      setValue((prev) =>
        prev.includes(selectedValue)
          ? prev.filter((v) => v !== selectedValue)
          : [...prev, selectedValue]
      );
    } else {
      setValue(selectedValue);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const handleBlur = () => {
    setIsTouched(true);
    setIsFocused(false);
    validateInput();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleRemove = (removedValue) => {
    if (isMulti) {
      setValue((prev) => prev.filter((v) => v !== removedValue));
    } else {
      setValue("");
    }
  };

  useEffect(() => {
    if (getFinalValue) {
      getFinalValue(isMulti ? value : value || "");
    }
  }, [value, getFinalValue, isMulti]);

  const validateInput = () => {
    if (
      isRequired &&
      (!value || (isMulti && Array.isArray(value) && value.length === 0))
    ) {
      setError(`${label} zorunludur`);
    } else if (customValidation && !customValidation(value)) {
      setError(customErrorMessage || `Geçersiz değer`);
    } else {
      setError("");
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error && isTouched}
      my={4}
      ref={wrapperRef}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Flex
          align="center"
          flexWrap="wrap"
          position="relative"
          borderColor={
            error &&
            isTouched &&
            !isFocused &&
            (!value || (isMulti && value.length <= 0))
              ? "red.500"
              : borderColor
          }
          borderWidth="1px"
          borderRadius="md"
          p={2}
          onClick={() => {
            !disabled && !readOnly && setIsOpen(true);
            inputRef.current && inputRef.current.focus();
          }}
          width="100%"
        >
          {isMulti &&
            value.map((val) => (
              <Tag
                key={val}
                size="sm"
                borderRadius="full"
                variant="solid"
                mr={1}
                mb={1}
                px={3}
                py={1}
              >
                <TagLabel>
                  {options.find((option) => option.value === val)?.label}
                </TagLabel>
                <TagCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(val);
                  }}
                />
              </Tag>
            ))}
          {!isMulti && value && (
            <Tag
              size="sm"
              borderRadius="full"
              variant="solid"
              mr={1}
              mb={1}
              px={3}
              py={1}
            >
              <TagLabel>
                {options.find((option) => option.value === value)?.label}
              </TagLabel>
              <TagCloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(value);
                }}
              />
            </Tag>
          )}
          <Input
            ref={inputRef}
            name={name}
            placeholder={
              !value || (isMulti && value.length === 0) ? placeholder : ""
            }
            value={searchTerm}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            readOnly={readOnly}
            required={false}
            autoFocus={autoFocus}
            border="none"
            outline="none"
            _focus={{ boxShadow: "none" }}
            _hover={{ border: "none" }}
            _invalid={{ border: "none" }}
            flex="1"
            minW="50px"
            {...props}
          />
          {((isMulti && value.length > 0) || (!isMulti && value)) && (
            <IconButton
              icon={<FaTimes />}
              onClick={() => {
                setValue(isMulti ? [] : "");
              }}
              aria-label="Clear selection"
              size="sm"
              variant="ghost"
              disabled={disabled || readOnly}
              _hover={{ bg: "transparent" }}
            />
          )}
          <IconButton
            icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle dropdown"
            size="sm"
            variant="ghost"
            disabled={disabled || readOnly}
            _hover={{ bg: "transparent" }}
          />
        </Flex>
      </InputGroup>
      {isOpen && (
        <Box
          position="absolute"
          bg={bgColor}
          color={textColor}
          mt={1}
          borderWidth="1px"
          borderRadius="md"
          borderColor={borderColor}
          zIndex="1"
          width="100%"
          maxHeight="150px"
          overflowY="auto"
        >
          <List spacing={1}>
            {filteredOptions.map((option) => (
              <ListItem
                key={option.value}
                p={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
      {isTouched &&
        !isFocused &&
        (!value || (isMulti && value.length === 0)) && (
          <FormErrorMessage>{error}</FormErrorMessage>
        )}
    </FormControl>
  );
};

AutoComplate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpText: PropTypes.string,
  autoFocus: PropTypes.bool,
  customValidation: PropTypes.func,
  customErrorMessage: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
};

export default AutoComplate;
