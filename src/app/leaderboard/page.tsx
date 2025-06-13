'use client';
import Board from "../../components/Board";
import Navbar from "../../components/NavBar";
import styles from "./leaderboard.module.css";
import { useEffect } from "react";

export default function Leaderboard(){

    function checkAuthError() {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const error = params.get('error');
        const errorCode = params.get('error_code');
        const errorDescription = params.get('error_description');

        if (error && errorCode && errorDescription) {
            if (error === 'server_error' && errorDescription.includes('Database error saving new user')) {
            alert('Log-in failed: Only nyu.edu emails are allowed.');
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            } else {
            alert(`Authentication Error: ${errorDescription || error}`);
            }
        }
        }
    useEffect(() => {
          checkAuthError();
    }, []);
    return (<>
        <div className={styles.page}>
            <Navbar/>
            <main className={styles.main}>
                
                
                <Board></Board>

                

            </main>
        </div>
        </>
    );
}

