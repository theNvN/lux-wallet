import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import { AccountDetails } from 'components/account';
import { AddVaultForm, CreateVaultForm } from 'components/vault';
import { ModalView, useUI } from 'contexts/ui';

const ManagedModal = () => {
  const { isModalOpen, closeModal, modalView: view } = useUI();
  return (
    <Modal
      size="sm"
      closeOnOverlayClick={false}
      isCentered
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent borderRadius={24}>
        <ModalCloseButton />
        <ModalBody px={8} py={8}>
          {view === ModalView.SEND_TX && <Box />}
          {view === ModalView.CONFIRM_TX && <Box />}
          {view === ModalView.ADD_VAULT && <AddVaultForm />}
          {view === ModalView.CREATE_VAULT && <CreateVaultForm />}
          {view === ModalView.ACCOUNT_DETAILS && <AccountDetails />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;