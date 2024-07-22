import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Flex } from "@chakra-ui/react";

const Form = ({ onSubmit, children, buttonPosition = "right" }) => {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        getFinalValue: (value) => handleChange(child.props.name, value),
        initialValue: values[child.props.name],
      });
    }
    return child;
  });

  const justifyContentMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {enhancedChildren}
      <Flex justify={justifyContentMap[buttonPosition]} mt={4}>
        <Button type="submit">Gönder</Button>
      </Flex>
    </Box>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonPosition: PropTypes.oneOf(["left", "center", "right"]),
};

export default Form;
