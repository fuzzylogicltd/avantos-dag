import Modal from "react-modal";

import styles from "./DataElementMapModal.module.css";
import { Dispatch, SetStateAction } from "react";

interface DataElementMapModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DataElementMapModal = ({
  isOpen,
  setIsOpen,
}: DataElementMapModalProps) => {
  Modal.setAppElement("#root");

  return (
    <>
      <Modal isOpen={isOpen} className={styles.modal}>
        <button onClick={() => setIsOpen(false)}>X</button>
        <hr />
        modal content...
      </Modal>
    </>
  );
};
