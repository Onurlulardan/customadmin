import React from "react";
import PropTypes from "prop-types";
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Accordion = ({ items, allowMultiple = false, defaultIndex = [] }) => {
  return (
    <ChakraAccordion allowMultiple={allowMultiple} defaultIndex={defaultIndex}>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {item.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </ChakraAccordion>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  allowMultiple: PropTypes.bool,
  defaultIndex: PropTypes.arrayOf(PropTypes.number),
};

export default Accordion;
