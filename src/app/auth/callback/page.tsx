'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Wait briefly to ensure Supabase cookies are set
    const timer = setTimeout(() => {
      router.push('/leaderboard');
    }, 1500); // optional buffer

    return () => clearTimeout(timer);
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