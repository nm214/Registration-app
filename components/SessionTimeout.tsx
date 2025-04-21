import { useState, useEffect } from "react";
import SessionTimeoutModal from "../components/SessionTimeoutModal";

const SessionTimeout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    setTimeLeft(300);
    if (timerId) clearInterval(timerId);
    const newTimerId = setInterval(decrementTime, 1000);
    setTimerId(newTimerId);
  };

  const decrementTime = () => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        if (timerId !== null) {
          clearInterval(timerId);
        }
        setIsModalOpen(true);
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    const initialTimerId = setInterval(decrementTime, 1000);
    setTimerId(initialTimerId);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetTimer();
  };

  return (
    <div>
      <h1>Your session will expire in {timeLeft} seconds</h1>
      <SessionTimeoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SessionTimeout;
