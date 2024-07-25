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
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const DataTableDrawer = ({ isOpen, onClose, columnsOptions, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Yeni Kayıt Ekle</DrawerHeader>
        <DrawerBody>
          {columnsOptions.map((option) => (
            <FormControl key={option.key} mb={4}>
              <FormLabel>{option.label}</FormLabel>
              <Input
                name={option.key}
                type={option.type === "Number" ? "number" : "text"}
                onChange={handleChange}
              />
            </FormControl>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            İptal
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Kaydet
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DataTableDrawer;
