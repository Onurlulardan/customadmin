import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@chakra-ui/react";

const Form = ({ onSubmit, children }) => {
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

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {enhancedChildren}
      <Button type="submit" mt={4}>
        Gönder
      </Button>
    </Box>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
