'use client'; // Required for client-side hooks like useEffect

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import styles from '@/app/styles/redirect.module.css';

export default function Page({ params }: { params: { code: string } }) {
  const { code } = params;
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      const query = `
        query getDirectUrl($code: String!) {
          getDirectUrl(code: $code) 
        }`;
      const variables = { code };

      try {
        const response = await fetch("http://localhost:8001/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables }),
        });

        const responseBody = await response.json();
        if (responseBody.data.getDirectUrl) {
            setRedirectUrl(responseBody.data.getDirectUrl);
            router.push(responseBody.data.getDirectUrl);
        } else {
          console.error("Page not found");
          router.push('/not-found');
          // Optionally, handle the 404 case, e.g., by showing an error message or redirecting to a 404 page.
        }
      } catch (error) {
        console.error("Failed to fetch redirect URL", error);
        router.push('/fetch-error')
        // Optionally, handle errors during data fetching
      } finally {
        setLoading(false);
      }
    };

    fetchRedirectUrl();
  }, [code,redirectUrl]);

  const handleManualRedirect = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.loader}></div>
        <p className={styles.message}>Redirecting to your destination...</p>
      {!loading && 
          redirectUrl && (
            <button className={styles.manualRedirectButton} onClick={handleManualRedirect}>
              Click here if you are not redirected automatically
            </button>
          )}
        </div>
      )}
  
