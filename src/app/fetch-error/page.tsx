import React from 'react';
import styles from '@/app/styles/fetch-error.module.css'; // Import the CSS module

const FetchError: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.message}>Oops! Something went wrong while fetching data.</p>
      <p className={styles.message}>Please try refreshing the page.</p>
    </div>
  );
};

export default FetchError;
