'use client'
import React, { useState } from 'react'
import Profile from './Profile';
import { Leaderboard } from './database';
import styles from "./Board.module.css";
import { addTimeToDatabase } from './database';

export default function Board() {

  const [period, setPeriod] = useState(0);
  const [inputVal, setInputVal] = useState("")
  const handleClick = (e) => {
        setPeriod(e.target.dataset.id)
  }
  const handleSubmit = (e)=>{
          e.preventDefault()
  
          if (!inputVal) return
          addTimeToDatabase(inputVal)
          setInputVal("")
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
                                <input type="text" placeholder="Enter val here" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
                                <button type="submit">Submit your time!</button>
                            </label>
                        </form>
        <Profile Leaderboard={between(Leaderboard, period)}></Profile>

    </div>
  )
}

function between(data, betweenDays) {
  const today = new Date()
  const previous = new Date()
  previous.setDate(today.getDate() - betweenDays)

  const filtered = data.filter(val => {
    const userDate = new Date(val.dt)
    if (betweenDays == 0) return val;
    return userDate >= previous && userDate <= today
  })

  return filtered.sort((a, b) => a.time-b.time)
}
