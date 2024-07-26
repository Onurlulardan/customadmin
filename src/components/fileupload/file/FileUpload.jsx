import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FaUpload, FaFileAlt, FaTimes } from "react-icons/fa";
import { FileTypes } from "../enums";

const FileUpload = ({
  name,
  label,
  acceptedFileTypes,
  maxFileSize,
  getFinalValue,
  isRequired = false,
  valueType = "base64",
  helpText,
  initialValue = null,
  ...props
}) => {
  const [file, setFile] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setFile(initialValue);
  }, [initialValue]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const maxFileSizeInBytes = maxFileSize * 1024 * 1024;

      if (maxFileSize && selectedFile.size > maxFileSizeInBytes) {
        setError(`Dosya boyutu ${maxFileSize} MB'dan büyük olamaz.`);
        setFile(null);
        return;
      }

      if (valueType === "base64") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFile({
            name: selectedFile.name,
            size: selectedFile.size,
            content: reader.result,
          });
          if (getFinalValue) {
            getFinalValue(reader.result);
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFile(selectedFile);
        if (getFinalValue) {
          getFinalValue(selectedFile);
        }
      }

      setError("");
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validateInput();
  };

  const validateInput = () => {
    if (isRequired && !file) {
      setError(`${label} zorunludur.`);
    } else {
      setError("");
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (getFinalValue) {
      getFinalValue(null);
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error && isTouched}
      my={4}
      onBlur={handleBlur}
      {...props}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <VStack align="start">
        <Box
          as="label"
          htmlFor={name}
          p={4}
          borderWidth={1}
          borderRadius="md"
          borderColor={borderColor}
          bg={bgColor}
          color={textColor}
          cursor="pointer"
          _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
        >
          <HStack spacing={2}>
            <Icon as={FaUpload} />
            <Text>Dosya Seç</Text>
          </HStack>
          <Input
            type="file"
            id={name}
            name={name}
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Box>
        {file && (
          <HStack mt={2} spacing={2}>
            <Icon as={FaFileAlt} />
            <Text>{file.name}</Text>
            <IconButton
              icon={<FaTimes />}
              onClick={handleRemove}
              aria-label="Dosyayı Kaldır"
              size="sm"
              variant="ghost"
            />
          </HStack>
        )}
      </VStack>
      {helpText && !error && !file && (
        <FormHelperText>{helpText}</FormHelperText>
      )}
      {isTouched && error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  acceptedFileTypes: PropTypes.oneOf([
    FileTypes.IMAGE,
    FileTypes.PDF,
    FileTypes.WORD,
    FileTypes.EXCEL,
  ]),
  maxFileSize: PropTypes.number,
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  valueType: PropTypes.oneOf(["base64", "file"]),
  helpText: PropTypes.string,
  initialValue: PropTypes.any,
};

export default FileUpload;
