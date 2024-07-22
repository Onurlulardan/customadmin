import React, { useState } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { TextBox, TextArea } from "../../../components/textbox";

const MyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = () => {
    console.log("Final submitted name:", name);
    console.log("Final submitted email:", email);
    console.log("Final submitted description:", description);
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} color={textColor} p={4}>
      <TextBox
        label="İsim"
        name="name"
        placeholder="İsminizi girin"
        initialValue={name}
        getFinalValue={handleNameChange}
        isRequired={true}
        maxLength={20}
        helpText="Tam isminiz"
        showCharacterCount={true}
      />
      <TextBox
        label="E-posta"
        name="email"
        placeholder="E-posta adresinizi girin"
        initialValue={email}
        getFinalValue={handleEmailChange}
        type="email"
        isRequired={true}
        helpText="E-posta adresiniz"
      />
      <TextArea
        label="Açıklama"
        name="description"
        placeholder="Açıklamanızı girin"
        initialValue={description}
        getFinalValue={handleDescriptionChange}
        isRequired={true}
        maxLength={100}
        helpText="Açıklamanız"
      />
      <Button mt={4} onClick={handleSubmit}>
        Gönder
      </Button>
    </Box>
  );
};

export default MyForm;