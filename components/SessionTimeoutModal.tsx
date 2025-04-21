"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./SessionTimeoutModal.module.css";

const SessionTimeoutModal = ({ timeout = 300 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeLeftRef = useRef<number>(timeout);

  const resetTimer = () => {
    timeLeftRef.current = timeout;
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      if (timeLeftRef.current <= 0) {
        setIsModalOpen(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    startTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    resetTimer();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sessionModalOverlay}>
      <div className={styles.sessionModalContent}>
        <h2 className={styles.sessionModalTitle}>Session Timeout</h2>
        <p className={styles.sessionModalMessage}>
          Your session has expired due to inactivity.
        </p>
        <button onClick={handleClose} className={styles.sessionModalButton}>
          Restart Session
        </button>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
