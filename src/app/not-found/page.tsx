import Link from 'next/link';
import styles from '@/app/styles/not-found.module.css'; // Adjust the path if necessary

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>404</div>
      <div className={styles.message}>The page you are looking for does not exist.</div>
    </div>
  );
}
