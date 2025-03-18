import React from "react";
import Modal from "react-modal";
import styles from "./CustomModal.module.css";

Modal.setAppElement("#root");

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-lg font-semibold">
          ✖
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </Modal>
  );
};

export default CustomModal;
