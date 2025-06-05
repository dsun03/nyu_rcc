'use client'
import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import styles from "./Board.module.css";
import { createClient } from '@/lib/supabaseBrowserClient';
import type { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export default function Board() {
  
  const [period, setPeriod] = useState(0);
  const [inputVal, setInputVal] = useState("")
  
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [data, setData] = useState<any[] | null>(null)
  const [user, setUser] = useState<User | null>(null)  
  const supabase = createClient()

  const handleClick = (e) => {
        setPeriod(e.target.dataset.id)
  }
  const fetchData = async () => {
    const { data, error } = await supabase.from('leaderboard').select()
    if (error) {
      console.error("Error fetching data:", error)
    } else {
      setData(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      console.log(user)
    }

    getUser()
    

    // Optional: listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, []);
  const goToLogin = (e: { preventDefault: () => void; })=>{
    e.preventDefault()
    redirect('/login')
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    

    const { data, error } = await supabase
      .from('leaderboard')
      .upsert([
        {
          user_id: user?.id,
          full_name: user?.user_metadata.full_name,
          solve_time: inputVal,
          email: user?.email
        },
      ],
       { onConflict: 'user_id' })
      .select()

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      setInputVal("")       
      fetchData()  
    }
  }
  return (
    <div className={styles.leaderboardContainer}>
        <h1 className={styles.leaderboard}>Leaderboard</h1>

        <div className={styles.buttonContainer}>
            <button onClick={handleClick} data-id='7'>7 Days</button>
            <button onClick={handleClick} data-id='30'>30 Days</button>
            <button onClick={handleClick} data-id='0'>All-Time</button>
            
        </div>
        <form className={styles.submitForm} onSubmit={handleSubmit}>
                            <label className={styles.formLabel}>Add your time!
                                {user && <input type="text" placeholder="Enter time here" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>}
                                {user && <button type="submit">Submit your time!</button>}
                                {!user && <button onClick={goToLogin}>Sign in to add your time!</button>}
                            </label>
                        </form>
        {data && <Profile Leaderboard={between(data, period)}></Profile>}
    </div>
  )
}

function between(data: any[], betweenDays: number) {
  const today = new Date()
  const previous = new Date()
  previous.setDate(today.getDate() - betweenDays)

  const filtered = data.filter((val: { created_at: string | number | Date; }) => {
    const userDate = new Date(val.created_at)
    if (betweenDays == 0) return val;
    return userDate >= previous && userDate <= today
  })

  return filtered.sort((a: { solve_time: number; }, b: { solve_time: number; }) => a.solve_time-b.solve_time)
}
