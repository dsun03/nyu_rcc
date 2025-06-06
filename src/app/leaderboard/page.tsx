import Board from "../../components/Board";
import Navbar from "../../components/NavBar";
import styles from "./leaderboard.module.css";

export default function Leaderboard(){

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

