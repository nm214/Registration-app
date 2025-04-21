'use client';
import styles from './Summary.module.css';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register/1')

  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Welcome to FutureTech 2025</h1>
      <p className={styles.description}>
        Join us for a groundbreaking event where innovation meets inspiration. Explore cutting edge technology, connect with industry leaders, and shape the fuure together
      </p>
      <button className={styles.button} onClick={handleRegister}>Register</button>
    </div>
  );
}