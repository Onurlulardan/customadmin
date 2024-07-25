import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import SelectBox from "../../../components/selectbox";
import { FileTypes, FileUpload } from "../../../components/fileupload";

const DataTableDrawer = ({ isOpen, onClose, columnsOptions, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const renderInput = (option) => {
    switch (option.type) {
      case "String":
        return (
          <TextBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            maxLength={option.maxLength || undefined}
            helpText={option.helpText || ""}
            showCharacterCount={option.showCharacterCount || false}
            leftAddon={option.leftAddon || null}
            rightAddon={option.rightAddon || null}
          />
        );
      case "Number":
        return (
          <NumberBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            min={option.min || undefined}
            max={option.max || undefined}
            precision={option.precision || undefined}
            step={option.step || undefined}
            helpText={option.helpText || ""}
          />
        );
      case "TextArea":
        return (
          <TextArea
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            isRequired={option.isRequired || false}
            maxLength={option.maxLength || undefined}
            helpText={option.helpText || ""}
            showCharacterCount={option.showCharacterCount || false}
          />
        );
      case "Select":
        return (
          <SelectBox
            key={option.key}
            label={option.label}
            name={option.key}
            placeholder={option.placeholder || ""}
            options={option.options || []}
            isMulti={option.isMulti || false}
            isSearchable={option.isSearchable || false}
            helpText={option.helpText || ""}
            isRequired={option.isRequired || false}
          />
        );
      case "File":
        return (
          <FileUpload
            key={option.key}
            label={option.label}
            name={option.key}
            acceptedFileTypes={option.acceptedFileTypes || FileTypes.ALL}
            maxFileSize={option.maxFileSize || undefined}
            isRequired={option.isRequired || false}
            valueType={option.valueType || "base64"}
            helpText={option.helpText || ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Yeni Kayıt Ekle
          <Flex my={2}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Kaydet
            </Button>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Box bg={bgColor} color={textColor} p={4}>
            <Form
              onSubmit={handleSubmit}
              buttonPosition="left"
              defaultButton={false}
            >
              {columnsOptions.map((option) => renderInput(option))}
            </Form>
          </Box>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DataTableDrawer;
