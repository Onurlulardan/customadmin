import React from "react";
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
  Divider,
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../../components/textbox";
import SelectBox from "../../../components/selectbox";
import { FileTypes, FileUpload } from "../../../components/fileupload";

const DataTableDrawer = ({
  isOpen,
  onClose,
  columns,
  onSave,
  editMode,
  editData,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const handleSubmit = (formData) => {
    if (editMode) {
      formData.id = editData.id;
    }
    onSave(formData);
    // onClose();
  };

  const renderInput = (column) => {
    if (column.primaryKey) return null;

    const defaultValue =
      editMode && editData[column.key] ? editData[column.key] : "";

    switch (column.type) {
      case "String":
        return (
          <TextBox
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            isRequired={column.isRequired || false}
            maxLength={column.maxLength || undefined}
            helpText={column.helpText || ""}
            showCharacterCount={column.showCharacterCount || false}
            leftAddon={column.leftAddon || null}
            rightAddon={column.rightAddon || null}
            defaultValue={defaultValue}
          />
        );
      case "Number":
        return (
          <NumberBox
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            isRequired={column.isRequired || false}
            min={column.min || undefined}
            max={column.max || undefined}
            precision={column.precision || undefined}
            step={column.step || undefined}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
          />
        );
      case "TextArea":
        return (
          <TextArea
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            isRequired={column.isRequired || false}
            maxLength={column.maxLength || undefined}
            helpText={column.helpText || ""}
            showCharacterCount={column.showCharacterCount || false}
            defaultValue={defaultValue}
          />
        );
      case "Select":
        return (
          <SelectBox
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            options={column.options || []}
            isMulti={column.isMulti || false}
            isSearchable={column.isSearchable || false}
            helpText={column.helpText || ""}
            isRequired={column.isRequired || false}
            defaultValue={defaultValue}
          />
        );
      case "File":
        return (
          <FileUpload
            key={column.key}
            label={column.header}
            name={column.key}
            acceptedFileTypes={column.acceptedFileTypes || FileTypes.ALL}
            maxFileSize={column.maxFileSize || undefined}
            isRequired={column.isRequired || false}
            valueType={column.valueType || "base64"}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
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
          {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
        </DrawerHeader>
        <Divider />
        <DrawerBody>
          <Box bg={bgColor} color={textColor} p={4}>
            <Form
              onSubmit={handleSubmit}
              buttonPositionY="top"
              buttonPositionX="left"
              buttonLabel={editMode ? "Güncelle" : "Kaydet"}
              colorScheme="blue"
            >
              {columns.map((column) => renderInput(column))}
            </Form>
          </Box>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DataTableDrawer;
