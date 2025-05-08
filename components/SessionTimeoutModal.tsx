"use client";

import styles from "./SessionTimeoutModal.module.css";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SessionTimeoutModal() {
  const [showModal, setShowModal] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | number | null>(
    null
  );

  const startSession = () => {
    const expiryDate = new Date(new Date().getTime() + 5 * 60 * 1000);
    const value = `${Math.random() * 1000}`;
    Cookies.set("session_token", value, {
      expires: expiryDate,
      path: "/",
    });
  };

  const clearSession = () => {
    Cookies.remove("session_token");
  };

  useEffect(() => {
    startSession();
    startInterval();

    const activityHandler = () => {
      if (!showModal) {
        startSession();
      }
    };

    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("mousedown", activityHandler);
    window.addEventListener("keypress", activityHandler);

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("mousedown", activityHandler);
      window.removeEventListener("keypress", activityHandler);
    };
  }, []);

  const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      const token = Cookies.get("session_token");

      if (!token) {
        setShowModal(true);
        clearInterval(id);
      }
    }, 5000);

    setIntervalId(id);
  };

  const handleCloseModal = () => {
    clearSession();
    setShowModal(false);
    startSession();
    startInterval();
  };

  return (
    <>
      {showModal && (
        <div className={styles.sessionModalOverlay}>
          <div className={styles.sessionModalContent}>
            <Typography
              variant="h2"
              fontSize={"20px"}
              fontWeight={"bold"}
              color="#333"
            >
              Session Timeout
            </Typography>
            <Typography
              variant="h2"
              fontSize={"16px"}
              color="#555"
              marginTop={"30px"}
              marginBottom={"30px"}
            >
              Your session has expired due to inactivity.
            </Typography>
            <Button
              color="primary"
              variant="contained"
              className={styles.sessionModalButton}
              onClick={handleCloseModal}
            >
              Restart Session
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import styles from "./SessionTimeoutModal.module.css";
// import { Button, Typography } from "@mui/material";

// const SessionTimeoutModal = ({ timeout = 300 }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const timeLeftRef = useRef<number>(timeout);

//   const resetTimer = () => {
//     timeLeftRef.current = timeout;
//     if (timerRef.current) clearInterval(timerRef.current);
//     startTimer();
//   };

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       timeLeftRef.current -= 1;
//       if (timeLeftRef.current <= 0) {
//         setIsModalOpen(true);
//         if (timerRef.current) clearInterval(timerRef.current);
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     const events = ["mousemove", "keydown", "click"];
//     events.forEach((event) => window.addEventListener(event, resetTimer));

//     startTimer();

//     return () => {
//       events.forEach((event) => window.removeEventListener(event, resetTimer));
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, []);

//   const handleClose = () => {
//     setIsModalOpen(false);
//     resetTimer();
//   };

//   if (!isModalOpen) return null;

//   return (
//     <div className={styles.sessionModalOverlay}>
//       <div className={styles.sessionModalContent}>
//         <Typography
//           variant="h2"
//           fontSize={"20px"}
//           fontWeight={"bold"}
//           color="#333"
//         >
//           Session Timeout
//         </Typography>
//         <Typography
//           variant="h2"
//           fontSize={"16px"}
//           color="#555"
//           marginTop={"30px"}
//           marginBottom={"30px"}
//         >
//           Your session has expired due to inactivity.
//         </Typography>
//         <Button
//           color="primary"
//           variant="contained"
//           className={styles.sessionModalButton}
//           onClick={handleClose}
//         >
//           Restart Session
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SessionTimeoutModal;
