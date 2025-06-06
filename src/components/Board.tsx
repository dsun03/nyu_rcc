'use client';
import React, { use, useEffect, useState } from 'react';
import Profile from './Profile';
import styles from './Board.module.css';
import { createClient } from '@/lib/supabaseBrowserClient';
import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

export default function Board() {
  const [period, setPeriod] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [data, setData] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [solveTime, setSolveTime] = useState<string>('');
  const [rank, setRank] = useState<string>('');

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.from('leaderboard').select();
    if (error) {
      console.error('Error fetching leaderboard:', error);
    } else {
      setData(data);
    }
  };

  // Fetch current user's solve time
  const fetchSolveTime = async (userId: string) => {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('solve_time')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching solve time:', error);
    } else {
      console.log(data)
      setSolveTime(data?.solve_time || '');
    }
  };

  const fetchRank = async( userId: string)=>{
    const { data, error } = await supabase.rpc('get_user_ranks', {
      target_user_id: userId  
    });

    if (error){
      console.error('Error fetching rank', error.message)
    }
    else{
      setRank(data?.[0].rank)
    }
  }
  // Submit or update time
  const submitSolveTime = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('leaderboard')
      .upsert(
        [
          {
            user_id: user.id,
            full_name: user.user_metadata.full_name,
            solve_time: inputVal,
            email: user.email,
          },
        ],
        { onConflict: 'user_id' }
      )
      .select();

    if (error) {
      console.error('Error submitting solve time:', error);
    } else {
      setInputVal('');
      fetchLeaderboard();
      fetchSolveTime(user.id);
      fetchRank(user.id);
    }
  };

  // On load: get leaderboard + user
  useEffect(() => {
    fetchLeaderboard();

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user?.id) {
        await fetchSolveTime(user.id)
        await fetchRank(user.id)
      };
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const updatedUser = session?.user || null;
        setUser(updatedUser);
        if (updatedUser?.id) fetchSolveTime(updatedUser.id);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) submitSolveTime();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPeriod(Number(e.currentTarget.dataset.id));
  };

  const goToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    redirect('/login');
  };

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.leaderboard}>Leaderboard</h1>

      <div className={styles.buttonContainer}>
        <button onClick={handleClick} data-id="7">
          7 Days
        </button>
        <button onClick={handleClick} data-id="30">
          30 Days
        </button>
        <button onClick={handleClick} data-id="0">
          All-Time
        </button>
      </div>

      {user && (
        <div className={styles.statsContainer}>
          <h2 className={styles.statsHeader}>Your Current Performance</h2>
          <div className={styles.statsContent}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>⏱ Solve Time</span>
              <span className={styles.statValue}>
                {Number(solveTime).toFixed(3) || '—'}
              </span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>🏆 Rank</span>
              <span className={styles.statValue}>
                {rank ?? '—'}
              </span>
            </div>
          </div>
        </div>
      )}

      <form className={styles.submitForm} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>Add your time! (Seconds)</label>
        {user ? (
          <>
            <input
              type="text"
              placeholder="Enter time here"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit">Submit your time!</button>
          </>
        ) : (
          <button onClick={goToLogin}>Sign in to add your time!</button>
        )}
      </form>

      {data && <Profile Leaderboard={filterByDate(data, period)} />}
    </div>
  );
}

// Filter helper
function filterByDate(data: any[], days: number) {
  if (days === 0) return [...data].sort((a, b) => a.solve_time - b.solve_time);

  const today = new Date();
  const cutoff = new Date();
  cutoff.setDate(today.getDate() - days);

  return data
    .filter((val) => new Date(val.created_at) >= cutoff)
    .sort((a, b) => a.solve_time - b.solve_time);
}
