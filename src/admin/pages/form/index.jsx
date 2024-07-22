import React, { useState } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import TextBox from "../../../components/textbox/TextBox";

const MyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = () => {
    console.log("Final submitted name:", name);
    console.log("Final submitted email:", email);
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
      <Button mt={4} onClick={handleSubmit}>
        Gönder
      </Button>
    </Box>
  );
};

export default MyForm;
