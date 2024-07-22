import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  useColorModeValue,
  Text,
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
  ...props
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const acceptedExtensions = acceptedFileTypes.split(",").map((type) => {
        const [mainType, subType] = type.trim().split("/");
        return subType === "*" ? mainType : subType;
      });

      const mainType = selectedFile.type.split("/")[0];

      if (
        !acceptedExtensions.includes(fileExtension) &&
        !acceptedExtensions.includes(mainType)
      ) {
        setError(
          `Bu dosya türü kabul edilmiyor. Kabul edilen dosya türleri: ${acceptedFileTypes}`
        );
        setFile(null);
        setIsTouched(true);
        return;
      }

      const maxFileSizeInBytes = maxFileSize * 1024 * 1024;

      if (maxFileSize && selectedFile.size > maxFileSizeInBytes) {
        setError(`Dosya boyutu ${maxFileSize} MB'dan büyük olamaz.`);
        setFile(null);
        setIsTouched(true);
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
      setIsTouched(false);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validateInput();
  };

  const validateInput = () => {
    if (isRequired && !file) {
      setError(`${label} zorunludur.`);
    } else if (!file) {
      setError("");
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (getFinalValue) {
      getFinalValue(null);
    }
    setError("");
    setIsTouched(false);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
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
      {helpText && !error && <FormHelperText>{helpText}</FormHelperText>}
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
  ]).isRequired,
  maxFileSize: PropTypes.number,
  getFinalValue: PropTypes.func,
  isRequired: PropTypes.bool,
  valueType: PropTypes.oneOf(["base64", "file"]),
  helpText: PropTypes.string,
};

export default FileUpload;
