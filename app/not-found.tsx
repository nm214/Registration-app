"use client";

import Link from "next/link";
import styles from "./notFound.module.css";
import { Typography } from "@mui/material";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Typography
        variant="h3"
        fontWeight={"800"}
        color="#222"
        className={styles.title}
      >
        404 - Page Not Found
      </Typography>
      <Typography
        variant="h4"
        fontSize={"1.5rem"}
        fontWeight={"500"}
        color="#666"
        className={styles.message}
      >
        The page you are looking for does not exist.
      </Typography>
      <Link href="/" className={styles.link}>
        Go back home
      </Link>
    </div>
  );
}
