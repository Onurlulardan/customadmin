import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ShowConfirm = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Silme Onayı</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Emin misin seçilen satır silinecek bu işlem geri alınamaz!
        </ModalBody>
        <ModalFooter gap={2}>
          <Button colorScheme="red" onClick={onConfirm}>
            Evet, Sil!
          </Button>
          <Button variant="ghost" onClick={onClose}>
            İptal Et
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShowConfirm;
