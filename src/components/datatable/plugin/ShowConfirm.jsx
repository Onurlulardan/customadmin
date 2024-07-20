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

const ShowConfirm = ({ isOpen, onClose, onConfirm, deleteTarget }) => {
  const message =
    deleteTarget.length > 1
      ? "Emin misin seçilen satırlar silinecek bu işlem geri alınamaz!"
      : "Emin misin seçilen satır silinecek bu işlem geri alınamaz!";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Silme Onayı</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>
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
