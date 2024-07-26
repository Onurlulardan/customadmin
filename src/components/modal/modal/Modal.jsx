import React from "react";
import PropTypes from "prop-types";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const Modal = ({
  title,
  bodyContent,
  footerContent,
  size = "md",
  closeButton = true,
  triggerButtonLabel = "Open Modal",
  triggerButtonProps = {},
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...triggerButtonProps}>
        {triggerButtonLabel}
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          {closeButton && <ModalCloseButton />}
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>
            {footerContent ? (
              footerContent
            ) : (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  size: PropTypes.string,
  closeButton: PropTypes.bool,
  triggerButtonLabel: PropTypes.string,
  triggerButtonProps: PropTypes.object,
};

export default Modal;
