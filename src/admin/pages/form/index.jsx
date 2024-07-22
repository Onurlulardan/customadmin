import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import TextBox from "../../../components/textbox/TextBox";

const MyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = () => {
    if (!name) {
      setError("Name is required");
    } else {
      setError("");
      console.log("Final submitted name:", name);
      console.log("Final submitted email:", email);
    }
  };

  return (
    <Box>
      <TextBox
        label="Name"
        name="name"
        placeholder="Enter your name"
        initialValue={name}
        getFinalValue={handleNameChange}
        isRequired={true}
        error={name ? "" : error}
      />
      <TextBox
        label="Email"
        name="email"
        placeholder="Enter your email"
        initialValue={email}
        getFinalValue={handleEmailChange}
        type="email"
        isRequired={true}
        error={email ? "" : error}
      />
      <Button mt={4} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default MyForm;
