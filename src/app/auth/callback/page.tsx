'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log('[CLIENT] AuthCallback useEffect triggered');
    const timer = setTimeout(() => {
      console.log('[CLIENT] Redirecting to /leaderboard');
      router.push('/leaderboard');
    }, 1500);

    return () => {
      clearTimeout(timer);
      console.log('[CLIENT] Timer cleared');
    };
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <div className= {styles.spinner} />
      <p>Signing you in...</p>
    </div>
  );
}