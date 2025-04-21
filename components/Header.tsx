"use client";
import Link from "next/link";
import styles from "./Header.module.css";
 
const Header = () => (
  <header className={styles.header}>
    <h1>FutureTech Registration Portal</h1>
    <nav className={styles.nav}>
      <Link className={styles.nav} href="/summary">Home</Link>
      <Link className={styles.nav} href="/register/1">Register</Link>
    </nav>
  </header>
);
 
export default Header;