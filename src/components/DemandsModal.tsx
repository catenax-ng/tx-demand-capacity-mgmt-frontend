import React from 'react';
import { Modal } from 'react-bootstrap';

type DemandsModalProps = {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

const DemandsModal: React.FC<DemandsModalProps> = ({ show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      {children}
    </Modal>
  );
};

export default DemandsModal;
