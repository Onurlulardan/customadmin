import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  useColorModeValue,
  Divider,
  Flex,
} from "@chakra-ui/react";
import Form from "../../form";
import { TextBox, NumberBox, TextArea } from "../../textbox";
import { AutoComplate, SelectBox } from "../../selectbox";
import { FileTypes, FileUpload } from "../../fileupload";
import { DateTimePicker } from "../../timepicker";
import { RadioGroup, SwitchGroup, CheckboxGroup } from "../../selectioncontrol";

const DataTableForm = ({
  isOpen,
  onClose,
  columns,
  onSave,
  editMode,
  editData,
  showOn = "drawer",
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const handleSubmit = (formData) => {
    if (editMode) {
      formData.id = editData.id;
    }
    onSave(formData);
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
      case "AutoComplate":
        return (
          <AutoComplate
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
      case "SelectBox":
        return (
          <SelectBox
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            options={column.options || []}
            isRequired={column.isRequired || false}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
          />
        );
      case "DateTimePicker":
        return (
          <DateTimePicker
            key={column.key}
            label={column.header}
            name={column.key}
            placeholder={column.placeholder || ""}
            isRequired={column.isRequired || false}
            helpText={column.helpText || ""}
            leftAddon={column.leftAddon || null}
            setTodayAsDefault={column.setTodayAsDefault || false}
            includeTime={column.includeTime || true}
            defaultValue={defaultValue}
          />
        );
      case "RadioGroup":
        return (
          <RadioGroup
            key={column.key}
            label={column.header}
            name={column.key}
            options={column.options || []}
            isRequired={column.isRequired || false}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
          />
        );
      case "SwitchGroup":
        return (
          <SwitchGroup
            key={column.key}
            label={column.header}
            name={column.key}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
          />
        );
      case "CheckboxGroup":
        return (
          <CheckboxGroup
            key={column.key}
            label={column.header}
            name={column.key}
            options={column.options || []}
            isRequired={column.isRequired || false}
            helpText={column.helpText || ""}
            defaultValue={defaultValue}
          />
        );
      default:
        return null;
    }
  };

  const renderForm = () => {
    const groupedColumns = [];
    const unGroupedColumns = [];

    columns.forEach((column) => {
      if (column.formControl) {
        const existingGroup = groupedColumns.find(
          (group) => group.formControl === column.formControl
        );
        if (existingGroup) {
          existingGroup.columns.push(column);
        } else {
          groupedColumns.push({
            formControl: column.formControl,
            columns: [column],
          });
        }
      } else {
        unGroupedColumns.push(column);
      }
    });

    return (
      <Box bg={bgColor} color={textColor} p={4}>
        <Form
          onSubmit={handleSubmit}
          buttonPositionY="bottom"
          buttonPositionX="right"
          buttonLabel={editMode ? "Güncelle" : "Kaydet"}
          colorScheme="blue"
        >
          {unGroupedColumns.map((column) => renderInput(column))}
          {groupedColumns.map((group) => (
            <Flex key={group.formControl} flexDirection="row" gap={4}>
              {group.columns.map((column) => renderInput(column))}
            </Flex>
          ))}
        </Form>
      </Box>
    );
  };

  if (showOn === "modal") {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
          </ModalHeader>
          <Divider />
          <ModalBody>{renderForm()}</ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {editMode ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}
        </DrawerHeader>
        <Divider />
        <DrawerBody>{renderForm()}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DataTableForm;
