"use client";

import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" className={styles.link}>
        Go back home
      </Link>
    </div>
  );
}
