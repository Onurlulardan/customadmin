import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

const Form = ({ children, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  const updatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        getFinalValue: (value) => handleChange(child.props.name, value),
        initialValue: formValues[child.props.name] || "",
      });
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit}>
      {updatedChildren}
      <Button type="submit" mt={4}>
        Submit
      </Button>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
