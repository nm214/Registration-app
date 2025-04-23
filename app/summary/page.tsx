"use client";
import styles from "./Summary.module.css";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";

export default function SummaryPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register/1");
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2" color="#1f2937" className={styles.title}>
        Welcome to FutureTech 2025
      </Typography>
      <Typography color="#4b5563" className={styles.description}>
        Join us for a groundbreaking event where innovation meets inspiration.
        Explore cutting edge technology, connect with industry leaders, and
        shape the fuure together
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={styles.button}
        onClick={handleRegister}
        size="large"
      >
        Register
      </Button>
    </div>
  );
}
