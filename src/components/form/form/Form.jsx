import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Flex } from "@chakra-ui/react";

const Form = ({
  onSubmit,
  children,
  buttonPositionX = "left",
  buttonPositionY = "bottom",
  defaultButton = true,
  buttonLabel = "Gönder",
  colorScheme = "gray",
}) => {
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
      {defaultButton && buttonPositionY === "top" && (
        <Flex justify={justifyContentMap[buttonPositionX]} mb={4}>
          <Button colorScheme={colorScheme} type="submit">
            {" "}
            {buttonLabel}{" "}
          </Button>
        </Flex>
      )}
      {enhancedChildren}
      {defaultButton && buttonPositionY === "bottom" && (
        <Flex justify={justifyContentMap[buttonPositionX]} mt={4}>
          <Button colorScheme={colorScheme} type="submit">
            {buttonLabel}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonPosition: PropTypes.oneOf(["left", "center", "right"]),
};

export default Form;
