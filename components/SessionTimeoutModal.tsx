import React from "react";
import styles from "../components/SessionTimeoutModal.module.css";

interface SessionTimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.sessionModalOverlay}>
      <div className={styles.sessionModalContent}>
        <h2 className={styles.sessionModalTitle}>Session Timeout</h2>
        <p className={styles.sessionModalMessage}>
          Your session has expired due to inactivity.
        </p>
        <button onClick={onClose} className={styles.sessionModalButton}>
          Restart Session
        </button>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
