import React from "react";
import styles from "./Modal.module.css";
import { Button, Typography } from "@mui/material";
import { ModalProps } from "@/app/types/formTypes";

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modaloverlay} onClick={onClose}>
      <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalcontentAlignment}>
          <Typography variant="h5" fontWeight={600}>
            {message}
          </Typography>
          <Button size="small" className={styles.button} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
